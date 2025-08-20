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
import type { Payment } from "../../types";

interface PaymentTableProps {
  payments: Payment[];
  onItemSelect: (id: string) => void;
  selectedItems?: string[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onItemSelect,
  selectedItems = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
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
    return type === "electronic" ? "success" : "warning";
  };

  const getTypeLabel = (type: string) => {
    return type === "electronic" ? "Электронный" : "Наличный";
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Платежи
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              <TableCell>№</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>ФИО экзаменуемого</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payment) => (
                <TableRow
                  key={payment.id}
                  hover
                  onClick={() => handleSelectItem(payment.id)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: selectedItems.includes(payment.id)
                      ? "action.selected"
                      : "inherit",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(payment.id)}
                      onChange={() => handleSelectItem(payment.id)}
                    />
                  </TableCell>
                  <TableCell>{payment.number}</TableCell>
                  <TableCell>
                    {new Date(payment.createdAt).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={getTypeLabel(payment.type)}
                      color={getTypeColor(payment.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {payment.amount.toLocaleString("ru-RU")} ₽
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.customer}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.examineeName}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={payments.length}
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

export default PaymentTable;
