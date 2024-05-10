import { Button, Card, Drawer, Space, Typography } from "antd";
import { Text } from "../../text";
import { CloseOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { CustomAvatar } from "@components/custom-avatar";
import { useOne } from "@refinedev/core";
import { IUser } from "@pages/users";
type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  const { data: userData } = useOne<IUser>({
    resource: "users",
    id: userId,
  });
  const { FirstName, LastName, Avatar } = userData?.data ?? {};

  const closeModal = () => {
    setOpened(false);
  };
  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      <div className={styles.header}>
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={
            <CloseOutlined
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          }
          onClick={() => closeModal()}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.name}>
          <CustomAvatar
            style={{
              marginRight: "1rem",
              flexShrink: 0,
              fontSize: "40px",
            }}
            size={96}
            src={Avatar?.AvatarUrl}
            name={`${FirstName} ${LastName}`}
          />
          <Typography.Title
            level={3}
            style={{ padding: 0, margin: 0, width: "100%" }}
            className={styles.title}
            editable={{
              triggerType: ["text", "icon"],
              icon: (
                <EditOutlined
                  className={styles.titleEditIcon}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
              ),
            }}
          >
            {`${FirstName} ${LastName}`}
          </Typography.Title>
        </div>
        <Card
          title={
            <Space size={15}>
              <UserOutlined
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Text size="sm">User profile</Text>
            </Space>
          }
          headStyle={{ padding: "0 12px" }}
          bodyStyle={{ padding: "0" }}
        ></Card>
      </div>
    </Drawer>
  );
};
