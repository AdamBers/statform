import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox,
  Chip,
  Box,
  TablePagination,
} from "@mui/material";
import type { Invoice } from "../../types";

interface InvoiceTableProps {
  invoices: Invoice[];
  onItemSelect: (id: string) => void;
  selectedItems?: string[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onItemSelect,
  selectedItems = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectItem = (id: string) => {
    onItemSelect(id);
  };

  const getTypeColor = (type: string) => {
    return type === "education" ? "primary" : "secondary";
  };

  const getTypeLabel = (type: string) => {
    return type === "education" ? "Обучение" : "Пошлина";
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Счета
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              <TableCell>№</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>ФИО экзаменуемого</TableCell>
              <TableCell>Квалификация</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Заказчик</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((invoice) => (
                <TableRow
                  key={invoice.id}
                  hover
                  onClick={() => handleSelectItem(invoice.id)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedItems.includes(invoice.id)
                      ? "action.selected"
                      : "inherit",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(invoice.id)}
                      onChange={() => handleSelectItem(invoice.id)}
                    />
                  </TableCell>
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeLabel(invoice.type)}
                      color={getTypeColor(invoice.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {invoice.examineeName}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {invoice.qualification}
                  </TableCell>
                  <TableCell>
                    {invoice.amount.toLocaleString("ru-RU")} ₽
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {invoice.customer}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} из ${count !== -1 ? count : `более ${to}`}`
        }
      />
    </Box>
  );
};

export default InvoiceTable;
