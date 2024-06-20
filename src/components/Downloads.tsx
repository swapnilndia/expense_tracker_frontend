import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";
import { formattedDate } from "../utils/helperFunctions";
import useFetchDownloads from "../hooks/useDownloads";

interface Column {
  id: "id" | "fileName" | "downloadDate" | "downloadNow";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "File Id", align: "left" },
  { id: "fileName", label: "File Name", align: "right" },
  {
    id: "downloadDate",
    label: "Download Date",
    align: "right",
  },
  {
    id: "downloadNow",
    label: "Download Now",
    align: "right",
  },
];

export default function Downloads() {
  const { downloadList, loading } = useFetchDownloads();
  const handleDownload = async (url: string) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.click();
  };
  return (
    <Paper
      sx={{
        overflow: "hidden",
        margin: "2rem auto auto auto",
        border: "1px solid black",
        width: {
          sx: "90%",
          md: "70%",
        },
      }}
    >
      <Box padding={2}>
        <Typography align="center" variant="h4">
          Download History
        </Typography>
      </Box>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {Array.isArray(downloadList) && downloadList.length > 0 ? (
              <TableBody>
                {downloadList
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((download) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={download.id}
                      >
                        <TableCell align="left">{download.id}</TableCell>
                        <TableCell align="right">{download.fileName}</TableCell>
                        <TableCell align="right">
                          {formattedDate(download.createdAt)}
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            onClick={() => handleDownload(download.downloadURL)}
                            variant="contained"
                          >
                            Click to download
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography align="center" variant="h5">
                      Expense list is Empty
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
