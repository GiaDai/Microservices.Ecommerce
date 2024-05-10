import React from "react";
import { AvatarProps, UploadAvatar } from "@components/upload-avatar";

export const Dashboards: React.FC = () => {
  const [urlAvatar, setUrlAvatar] = React.useState<AvatarProps>();
  return (
    <div>
      <UploadAvatar
        setUrlAvatar={setUrlAvatar}
        publicId={urlAvatar?.PublicId}
        url={urlAvatar?.Url}
      />
      {urlAvatar?.Url && (
        <img src={urlAvatar.Url} alt="avatar" style={{ width: "100%" }} />
      )}
    </div>
  );
};
