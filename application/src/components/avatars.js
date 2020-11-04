import p1 from '../assets/avatars/1.svg'
import p2 from '../assets/avatars/2.svg'
import p3 from '../assets/avatars/3.svg'
import p4 from '../assets/avatars/4.svg'
import p5 from '../assets/avatars/5.svg'
import p6 from '../assets/avatars/6.svg'
import p7 from '../assets/avatars/7.svg'
import p8 from '../assets/avatars/8.svg'
import p9 from '../assets/avatars/9.svg'
import p10 from '../assets/avatars/10.svg'
import p11 from '../assets/avatars/11.svg'
import p12 from '../assets/avatars/12.svg'
import p13 from '../assets/avatars/13.svg'
import p14 from '../assets/avatars/14.svg'
import p15 from '../assets/avatars/15.svg'
import p16 from '../assets/avatars/16.svg'
import p17 from '../assets/avatars/17.svg'
import p18 from '../assets/avatars/18.svg'
import p19 from '../assets/avatars/19.svg'
import p20 from '../assets/avatars/20.svg'
import p21 from '../assets/avatars/21.svg'
import p22 from '../assets/avatars/22.svg'
import p23 from '../assets/avatars/23.svg'
import p24 from '../assets/avatars/24.svg'
import p25 from '../assets/avatars/25.svg'
import p26 from '../assets/avatars/26.svg'
import p27 from '../assets/avatars/27.svg'
import p28 from '../assets/avatars/28.svg'
import p29 from '../assets/avatars/29.svg'
import p30 from '../assets/avatars/30.svg'
import p31 from '../assets/avatars/31.svg'
import p32 from '../assets/avatars/32.svg'
import p33 from '../assets/avatars/33.svg'
import p34 from '../assets/avatars/34.svg'
import p35 from '../assets/avatars/35.svg'
import p36 from '../assets/avatars/36.svg'


export const avatars = [
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11,
    p12,
    p13,
    p14,
    p15,
    p16,
    p17,
    p18,
    p19,
    p20,
    p21,
    p22,
    p23,
    p24,
    p25,
    p26,
    p27,
    p28,
    p29,
    p30,
    p31,
    p32,
    p33,
    p34,
    p35,
    p36,

]


const getRandomInteger = (max = 100, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomAvatar = () => avatars[getRandomInteger(avatars.length, 0)]

