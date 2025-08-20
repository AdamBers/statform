import { useState, useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Alert,
  Snackbar,
  Divider,
} from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import PaymentTable from "./components/PaymentTable/PaymentTable";
import InvoiceTable from "./components/InvoiceTable/InvoiceTable";
import LinkedItems from "./components/LinkedItems/LinkedItems";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import type { Payment, Invoice, LinkedItem, FilterState } from "./types";
import { mockPayments, mockInvoices } from "./data/mockData";

function App() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [linkedItems, setLinkedItems] = useState<LinkedItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  const handlePaymentSelect = useCallback(
    (id: string) => {
      setSelectedPayment(selectedPayment === id ? null : id);
    },
    [selectedPayment]
  );

  const handleInvoiceSelect = useCallback(
    (id: string) => {
      setSelectedInvoice(selectedInvoice === id ? null : id);
    },
    [selectedInvoice]
  );

  const handleLinkItems = useCallback(() => {
    if (!selectedPayment || !selectedInvoice) {
      setSnackbar({
        open: true,
        message: "Выберите платеж и счет для связывания",
        severity: "error",
      });
      return;
    }

    const payment = payments.find((p) => p.id === selectedPayment);
    const invoice = invoices.find((i) => i.id === selectedInvoice);

    if (!payment || !invoice) {
      setSnackbar({
        open: true,
        message: "Ошибка: не удалось найти выбранные элементы",
        severity: "error",
      });
      return;
    }

    // Проверяем, не связаны ли уже эти элементы
    const alreadyLinked = linkedItems.some(
      (item) =>
        item.paymentId === selectedPayment || item.invoiceId === selectedInvoice
    );

    if (alreadyLinked) {
      setSnackbar({
        open: true,
        message: "Один из элементов уже связан с другим",
        severity: "error",
      });
      return;
    }

    // Создаем связь
    const newLinkedItem: LinkedItem = {
      id: Date.now().toString(),
      paymentId: selectedPayment,
      invoiceId: selectedInvoice,
      payment,
      invoice,
      linkedAt: new Date().toISOString(),
    };

    setLinkedItems((prev) => [...prev, newLinkedItem]);

    // Очищаем выбор
    setSelectedPayment(null);
    setSelectedInvoice(null);

    setSnackbar({
      open: true,
      message: `Платеж №${payment.number} успешно связан со счетом №${invoice.number}`,
      severity: "success",
    });
  }, [selectedPayment, selectedInvoice, payments, invoices, linkedItems]);

  const handleUnlink = useCallback((id: string) => {
    setLinkedItems((prev) => prev.filter((item) => item.id !== id));
    setSnackbar({
      open: true,
      message: "Связь успешно удалена",
      severity: "info",
    });
  }, []);

  const handleFilterChange = useCallback((filters: FilterState) => {
    // Здесь можно реализовать логику фильтрации
    console.log("Применены фильтры:", filters);
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Сопоставление счетов и платежей
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Система для бухгалтеров по связыванию платежей и счетов в ручном режиме
      </Typography>

      <FilterPanel onFilterChange={handleFilterChange} />

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Paper sx={{ flex: 1, p: 2 }}>
          <PaymentTable
            payments={payments}
            onItemSelect={handlePaymentSelect}
            selectedItems={selectedPayment ? [selectedPayment] : []}
          />
        </Paper>

        <Paper sx={{ flex: 1, p: 2 }}>
          <InvoiceTable
            invoices={invoices}
            onItemSelect={handleInvoiceSelect}
            selectedItems={selectedInvoice ? [selectedInvoice] : []}
          />
        </Paper>
      </Box>

      {/* Панель связывания */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Связывание элементов</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2" color="text.secondary">
            Выбрано:{" "}
            {selectedPayment
              ? `Платеж №${
                  payments.find((p) => p.id === selectedPayment)?.number
                }`
              : "нет"}
            {selectedPayment && selectedInvoice ? " + " : ""}
            {selectedInvoice
              ? `Счет №${
                  invoices.find((i) => i.id === selectedInvoice)?.number
                }`
              : ""}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            startIcon={<LinkIcon />}
            onClick={handleLinkItems}
            disabled={!selectedPayment || !selectedInvoice}
            size="large"
          >
            Связать выбранные
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <LinkedItems items={linkedItems} onUnlink={handleUnlink} />
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
