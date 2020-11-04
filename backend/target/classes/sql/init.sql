INSERT INTO COMMENT
("id", "parent_id", "user_id", "raw", "owner_type", "create_at", "update_at")
SELECT 0, 0, 0,  '', 'root', NOW(),  NOW() WHERE NOT EXISTS (SELECT * FROM COMMENT WHERE id = 0 );;
