import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Collapse,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import type { FilterState } from "../../types";

interface FilterPanelProps {
  onFilterChange?: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    paymentNumber: "",
    invoiceNumber: "",
    customer: "",
    customerInn: "",
    executor: "",
    executorInn: "",
    examineeName: "",
    amountFrom: "",
    amountTo: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleFilterChange = (
    field: keyof FilterState,
    value: string | number
  ) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      paymentNumber: "",
      invoiceNumber: "",
      customer: "",
      customerInn: "",
      executor: "",
      executorInn: "",
      examineeName: "",
      amountFrom: "",
      amountTo: "",
      dateFrom: "",
      dateTo: "",
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const handleSearch = () => {
    onFilterChange?.(filters);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6">Поиск и фильтрация</Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setExpanded(!expanded)}
            sx={{ mr: 1 }}
          >
            {expanded ? "Скрыть фильтры" : "Показать фильтры"}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
            color="error"
          >
            Очистить
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="Поиск по ФИО или ИНН"
            value={filters.examineeName || filters.customerInn}
            onChange={(e) => {
              handleFilterChange("examineeName", e.target.value);
              handleFilterChange("customerInn", e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Номер платежа"
            value={filters.paymentNumber}
            onChange={(e) =>
              handleFilterChange("paymentNumber", e.target.value)
            }
          />
          <TextField
            fullWidth
            size="small"
            label="Номер счета"
            value={filters.invoiceNumber}
            onChange={(e) =>
              handleFilterChange("invoiceNumber", e.target.value)
            }
          />
        </Box>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size="small"
              label="Заказчик"
              value={filters.customer}
              onChange={(e) => handleFilterChange("customer", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="ИНН заказчика"
              value={filters.customerInn}
              onChange={(e) =>
                handleFilterChange("customerInn", e.target.value)
              }
            />
            <TextField
              fullWidth
              size="small"
              label="Исполнитель"
              value={filters.executor}
              onChange={(e) => handleFilterChange("executor", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label="ИНН исполнителя"
              value={filters.executorInn}
              onChange={(e) =>
                handleFilterChange("executorInn", e.target.value)
              }
            />
            <TextField
              fullWidth
              size="small"
              label="Сумма от"
              type="number"
              value={filters.amountFrom}
              onChange={(e) => handleFilterChange("amountFrom", e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Сумма до"
              type="number"
              value={filters.amountTo}
              onChange={(e) => handleFilterChange("amountTo", e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">₽</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="Дата от"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              size="small"
              label="Дата до"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
      </Collapse>

      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Найти
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
