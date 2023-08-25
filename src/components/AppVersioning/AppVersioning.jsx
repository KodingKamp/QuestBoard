import { Box } from "@mui/joy";

const AppVersioning = () => {
  const versionNumber = '0.1 (alpha)';

  return (
    <Box textAlign='center' color='grey'>
      <div>
        version {versionNumber}
      </div>

      <div>
        &copy; 2023 OriginalLeft
      </div>
    </Box>
  );
};

export default AppVersioning;