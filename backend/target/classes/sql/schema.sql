

CREATE TABLE IF NOT EXISTS ACCOUNT(
Id 			SERIAL   PRIMARY KEY    NOT NULL,
username    TEXT     UNIQUE         NOT NULL,
password    TEXT                    NOT NULL,
avatar      TEXT                    ,

alias       TEXT                    NOT NULL,
description TEXT                    ,
role       TEXT                    NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL



);


CREATE TABLE IF NOT EXISTS COMMENT(
Id 			SERIAL    PRIMARY KEY   NOT NULL,
parent_id    INTEGER                 NOT NULL,
user_id         INTEGER              NOT NULL,
raw         TEXT                            ,
owner_type         TEXT             NOT NULL,
create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL

);

CREATE TABLE IF NOT EXISTS BLOG_POST_META(
Id 			SERIAL   PRIMARY KEY    NOT NULL,
owner_id     INTEGER                 NOT NULL,
read_num     INTEGER                 NOT NULL,
like_num     INTEGER                 NOT NULL,
tags         TEXT[]                          ,
description         TEXT                  NOT NULL,
title       TEXT                    NOT NULL,
url         TEXT     UNIQUE         NOT NULL,
logo         TEXT                   NOT NULL,


permission  TEXT                   NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL

);

CREATE TABLE IF NOT EXISTS BLOG_POST_DOC(
Id 			SERIAL    PRIMARY KEY   NOT NULL,
owner_id     INTEGER                 NOT NULL,

raw         TEXT                    NOT NULL,
version     TEXT                  NOT NULL,
create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL
);

CREATE TABLE IF NOT EXISTS BLOG_TOPIC(
    Id 			SERIAL   PRIMARY KEY    NOT NULL,
    owner_id     INTEGER                 NOT NULL,
    description         TEXT                 NOT NULL,
    title       TEXT                    NOT NULL,
    url         TEXT     UNIQUE         NOT NULL,
    logo         TEXT                   NOT NULL,
    permission  TEXT                   NOT NULL,
    create_at   TIMESTAMP               NOT NULL,
    update_at   TIMESTAMP               NOT NULL
);
CREATE TABLE IF NOT EXISTS BLOG_TOPIC_CATALOG(
    Id 			SERIAL   PRIMARY KEY    NOT NULL,
    owner_id    INTEGER                 NOT NULL,
    parent_id   INTEGER                 NOT NULL,
    title       TEXT                            ,
    doc_id      INTEGER                         ,
    node_type   TEXT                    NOT NULL,
    create_at   TIMESTAMP               NOT NULL,
    update_at   TIMESTAMP               NOT NULL
);


CREATE TABLE IF NOT EXISTS BLOG_PROJECT(
    Id 			SERIAL   PRIMARY KEY    NOT NULL,
    owner_id     INTEGER                 NOT NULL,
    description  TEXT                 NOT NULL,
    title       TEXT                    NOT NULL,
    url         TEXT     UNIQUE         NOT NULL,
    iframe       TEXT              NOT NULL,
    logo         TEXT                   NOT NULL,
    permission  TEXT                   NOT NULL,
    create_at   TIMESTAMP               NOT NULL,
    update_at   TIMESTAMP               NOT NULL
);



CREATE TABLE IF NOT EXISTS EASYCODE_COMPONENT(
Id 			SERIAL   PRIMARY KEY    NOT NULL,
owner_id     INTEGER                 NOT NULL,


tags         TEXT[]                          ,
description  TEXT                           ,
title       TEXT                    NOT NULL,

logo         TEXT                   NOT NULL,


permission  TEXT                   NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL

);



CREATE TABLE IF NOT EXISTS EASYCODE_COMPONENT_RAW(
Id 			SERIAL    PRIMARY KEY   NOT NULL,
owner_id     INTEGER                 NOT NULL,

vars        TEXT                    NOT NULL,
template    TEXT                            ,

version     INTEGER                  NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL
);


CREATE TABLE IF NOT EXISTS EASYCODE_ACTION(
Id 			SERIAL   PRIMARY KEY    NOT NULL,
owner_id     INTEGER                 NOT NULL,


tags         TEXT[]                          ,
description  TEXT                           ,
title       TEXT                    NOT NULL,

logo         TEXT                   NOT NULL,


permission  TEXT                   NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL

);


CREATE TABLE IF NOT EXISTS EASYCODE_ACTION_RAW(
Id 			SERIAL    PRIMARY KEY   NOT NULL,
owner_id     INTEGER                 NOT NULL,

vars        TEXT                    NOT NULL,
template    TEXT                            ,
version     INTEGER                  NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL
);

CREATE TABLE IF NOT EXISTS EASYCODE_CODE(
Id 			SERIAL   PRIMARY KEY    NOT NULL,
owner_id     INTEGER                 NOT NULL,


tags         TEXT[]                          ,
description  TEXT                           ,
title       TEXT                    NOT NULL,

logo         TEXT                   NOT NULL,
template    TEXT                            ,

permission  TEXT                   NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL

);


CREATE TABLE IF NOT EXISTS EASYCODE_CODE_RAW(
Id 			SERIAL    PRIMARY KEY   NOT NULL,
owner_id     INTEGER                 NOT NULL,

vars        TEXT                    NOT NULL,
template    TEXT                            ,
version     INTEGER                  NOT NULL,

create_at   TIMESTAMP               NOT NULL,
update_at   TIMESTAMP               NOT NULL
);

CREATE TABLE IF NOT EXISTS EASYCODE_CODE_CATALOG(
    Id 			SERIAL   PRIMARY KEY    NOT NULL,
    owner_id    INTEGER                 NOT NULL,
    parent_id   INTEGER                 NOT NULL,
    title       TEXT                            ,
    doc_id      INTEGER                         ,
    node_type   TEXT                    NOT NULL,
    create_at   TIMESTAMP               NOT NULL,
    update_at   TIMESTAMP               NOT NULL
);

