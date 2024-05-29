/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile } from "@mui/icons-material";
import {
  FormControl,
  Typography,
  FormHelperText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {}

export default function AppDropzone(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const dzStyles = {
    display: "flex",
    border: "dashed 3px #eee",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    alignItems: "center",
    height: 200,
    width: 500,
  };

  const dzActive = {
    borderColor: "green",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div {...getRootProps()}>
      <FormControl
        style={
          isDragActive
            ? {
                ...dzStyles,
                ...dzActive,
                ...(isMobile && { maxWidth: "200px", margin: "auto" }),
              }
            : { ...(isMobile && { maxWidth: "200px", margin: "auto" }) }
        }
        error={!!fieldState.error}
      >
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: isMobile ? "80px" : "100px" }} />
        <Typography variant={isMobile ? "h5" : "h4"}>
          Drop image here
        </Typography>
        <FormHelperText sx={{ fontSize: isMobile ? "12px" : "inherit" }}>
          {fieldState.error?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
}
