package routers

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"net/url"
	pg "web/postgres"
	"web/postgres/account"
	"web/postgres/github"
	"web/tools"
)

func OauthLogin(r *gin.Engine)  {
	Github(r)

}

func Github(r *gin.Engine)  {
	r.GET("/Golang/Login/Oauth/Github", func(c *gin.Context) {
		code := c.Query("code")
		if (code == "") {
			Ret(c, false, "数据格式错误")
			return
		}
		requestUrl := "https://github.com/login/oauth/access_token?" +
			"code=" + code +
			"&client_id=" + tools.Conf.GITHUB.ClientId +
			"&client_secret=" + tools.Conf.GITHUB.ClientSecret
		res, err := http.Post(requestUrl, "	application/json; charset=utf-8", nil, )
		defer res.Body.Close()

		content, err := ioutil.ReadAll(res.Body)
		if err != nil || res.StatusCode != 200 {
			fmt.Println("由于不可抗力且不可描述的原因，后端服务器连接Github认证服务器失败", err.Error())
			Ret(c, false, "由于不可抗力且不可描述的原因，后端服务器连接Github认证服务器失败")
			return
		}
		//fmt.Println(content)
		//content2 := string(content)
		//fmt.Println(content2)//url.ParseQuery(content2))
		githubApi := "https://api.github.com/user?" + string(content)
		response, err := http.Get(githubApi + string(content))
		if err != nil {
			// handle error
			fmt.Println("由于不可抗力且不可描述的原因，后端服务器获取Github信息失败" + err.Error())
			Ret(c, false, "由于不可抗力且不可描述的原因，后端服务器获取Github信息失败")
			return
		}
		defer response.Body.Close()
		if response.StatusCode != 200 {
			Ret(c, false, " token 已过期 ")
			return
		}
		url.Parse(githubApi)

		//程序在使用完回复后必须关闭回复的主体。
		//fmt.Println(response.StatusCode)
		body, _ := ioutil.ReadAll(response.Body)
		var j github.Github
		if err := json.Unmarshal(body, &j); err != nil || j.GithubId == 0 {
			Ret(c, false, "请求已过期，请重试")
			fmt.Println("Fatal error ", err.Error())
			return
		}
		// 初始化密码
		if a := account.SelectByOriginId(pg.Client, j.GithubId); a.OriginId > 0 {
			github.Delete(pg.Client, j.GithubId)
			if err := github.Insert(pg.Client, j); err != nil {
				Ret(c, false, "插入Github失败")
				fmt.Println("Fatal error ", err.Error())
				return
			}
		} else {
			b := account.Account{
				Name:j.Name,
				Origin:"Github",
				OriginId:j.GithubId,
				Website:j.Blog,
				Email:j.Email,
				Password: tools.GetRandomPassword(),
			};
			if err := account.Insert(pg.Client, b); err != nil {
				Ret(c, false, "插入 account 失败")
				fmt.Println("Fatal error ", err.Error())
				return
			}
			if err := github.Insert(pg.Client, j); err != nil {
				Ret(c, false, "插入Github失败")
				fmt.Println("Fatal error ", err.Error())
				return
			}
		}
		a := account.SelectByOriginId(pg.Client, j.GithubId)
		//c.Data(http.StatusOK, "text/html; charset=utf-8;", []byte("<script>window.close()</script>"))
		SetOauthCookie(c, "Github", j.GithubId, tools.GenerateFromPassword(a.Password))
		c.Data(http.StatusOK, "text/html; charset=utf-8;", []byte("<script>window.close()</script>"))
		//c.SetCookie("oauthToken", a.Password, 36000000, "/", "localhost", false, true)
		return
		//c.Data(http.StatusOK, "text/html; charset=utf-8;", []byte("<script>window.close()</script>"))

	})

	r.GET("/Golang/Oauth", func(c *gin.Context) {

		if(OauthLoginStatus(c)){
			if g, err := github.SelectBasicInfo(pg.Client, GetOauthCookie(c).OriginId); err == nil  {
				Ret(c, true, g)
				return
			}

			Ret(c, false, "查无此数据")
			return
		}


		Ret(c, false, "Oauth未登录")
		return
	})
}