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
  IconButton,
  Box,
  TablePagination,
  Chip,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon, Link as LinkIcon } from "@mui/icons-material";
import type { LinkedItem } from "../../types";

interface LinkedItemsProps {
  items: LinkedItem[];
  onUnlink: (id: string) => void;
}

const LinkedItems: React.FC<LinkedItemsProps> = ({ items, onUnlink }) => {
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

  const handleUnlink = (id: string) => {
    onUnlink(id);
  };

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <LinkIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Нет связанных элементов
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Выберите платеж и счет для создания связи
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Связанные платежи и счета ({items.length})
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Платеж</TableCell>
              <TableCell>Счет</TableCell>
              <TableCell>Сумма</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>ФИО экзаменуемого</TableCell>
              <TableCell>Дата связи</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        №{item.payment.number}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(item.payment.createdAt).toLocaleDateString(
                          "ru-RU"
                        )}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        №{item.invoice.number}
                      </Typography>
                      <Chip
                        label={
                          item.invoice.type === "education"
                            ? "Обучение"
                            : "Пошлина"
                        }
                        color={
                          item.invoice.type === "education"
                            ? "primary"
                            : "secondary"
                        }
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {item.payment.amount.toLocaleString("ru-RU")} ₽
                    </Typography>
                    {item.payment.amount !== item.invoice.amount && (
                      <Chip
                        label="Суммы не совпадают!"
                        color="error"
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.payment.customer}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.payment.examineeName}
                  </TableCell>
                  <TableCell>
                    {new Date(item.linkedAt).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Удалить связь">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleUnlink(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
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

export default LinkedItems;
