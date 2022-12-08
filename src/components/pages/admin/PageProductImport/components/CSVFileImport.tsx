import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUploadProduct } from "~/queries/products";
import LoginModal from "~/components/LoginModal/LoginModal";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loginModalOpened, setLoginModalOpened] = useState(false);

  const uploadProduct = useUploadProduct();

  useEffect(() => {
    if (
      uploadProduct.error?.response?.status &&
      [401, 403].includes(uploadProduct.error.response.status)
    ) {
      setLoginModalOpened(true);
    }
  }, [uploadProduct.error]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async () => {
    if (!file) {
      console.error("Can not find file for upload");
      return;
    }
    console.log("uploadFile to", url);
    console.log("File to upload: ", file.name);

    const result = await uploadProduct.mutateAsync(file);
    console.log("Products file has been uploaded successfully!", result);

    setFile(null);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpened(false);
  };

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {!file ? (
          <input type="file" onChange={onFileChange} />
        ) : (
          <div>
            <button onClick={removeFile}>Remove file</button>
            <button onClick={uploadFile}>Upload file</button>
          </div>
        )}
      </Box>
      <LoginModal
        open={loginModalOpened}
        onClose={handleLoginModalClose}
        onLogin={uploadFile}
      />
    </>
  );
}
