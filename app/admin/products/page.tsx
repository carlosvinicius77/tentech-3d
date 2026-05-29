"use client";

import { useState } from "react";
import Link from "next/link";
import DataTable, { Column } from "../components/DataTable";

interface Product {
  id: string;
  image: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  active: boolean;
  [key: string]: unknown;
}

const INITIAL: Product[] = [
  { id: "1",  image: "📦", name: "Miniatura Personalizada",     sku: "MIN-001", category: "Miniaturas",   price: "R$ 89,90",    stock: 42, active: true  },
  { id: "2",  image: "🧵", name: "Filamento PLA+ 1kg Branco",   sku: "FIL-001", category: "Filamentos",   price: "R$ 59,90",    stock: 18, active: true  },
  { id: "3",  image: "🖨️", name: "Impressora FDM Pro X200",     sku: "IMP-001", category: "Impressoras",  price: "R$ 1.299,00", stock: 3,  active: true  },
  { id: "4",  image: "📛", name: "Placa Nome Personalizada",     sku: "PLA-001", category: "Decoração",    price: "R$ 34,90",    stock: 67, active: true  },
  { id: "5",  image: "🎲", name: "Pack Miniaturas D&D (10un)",   sku: "MIN-002", category: "Miniaturas",   price: "R$ 129,90",   stock: 12, active: true  },
  { id: "6",  image: "🧵", name: "Filamento PETG 1kg Preto",     sku: "FIL-002", category: "Filamentos",   price: "R$ 69,90",    stock: 9,  active: true  },
  { id: "7",  image: "📱", name: "Suporte Celular Mesa Custom",  sku: "SUP-001", category: "Acessórios",   price: "R$ 24,90",    stock: 55, active: true  },
  { id: "8",  image: "🎮", name: "Caixa Controle PS5 Custom",   sku: "CAI-001", category: "Gaming",       price: "R$ 44,90",    stock: 8,  active: false },
  { id: "9",  image: "🧵", name: "Filamento ABS Cinza 1kg",      sku: "FIL-003", category: "Filamentos",   price: "R$ 64,90",    stock: 2,  active: true  },
  { id: "10", image: "🧪", name: "Resina Translúcida 500ml",     sku: "RES-001", category: "Resinas",      price: "R$ 79,90",    stock: 3,  active: true  },
  { id: "11", image: "🏠", name: "Modelo Arquitetônico Escala",  sku: "ARQ-001", category: "Arquitetura",  price: "R$ 199,90",   stock: 5,  active: true  },
  { id: "12", image: "🔧", name: "Kit Ferramentas Acabamento",   sku: "KIT-001", category: "Ferramentas",  price: "R$ 49,90",    stock: 22, active: false },
];

const CATEGORIES = ["Todas", "Miniaturas", "Filamentos", "Impressoras", "Decoração", "Acessórios", "Gaming", "Resinas", "Arquitetura", "Ferramentas"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Todas");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "Todas" || p.category === catFilter;
    const matchStatus = statusFilter === "Todos" || (statusFilter === "Ativo" ? p.active : !p.active);
    return matchSearch && matchCat && matchStatus;
  });

  const toggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  const handleDelete = (row: Product) => {
    if (confirm(`Excluir "${row.name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== row.id));
    }
  };

  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "Img",
      width: "56px",
      render: (row) => (
        <div
          style={{
            width: 40, height: 40, borderRadius: 8,
            background: "#f3f4f6",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}
        >
          {row.image as string}
        </div>
      ),
    },
    { key: "name",     label: "Nome" },
    { key: "sku",      label: "SKU",       width: "100px" },
    { key: "category", label: "Categoria", width: "120px" },
    { key: "price",    label: "Preço",     width: "110px" },
    {
      key: "stock",
      label: "Estoque",
      width: "80px",
      render: (row) => (
        <span style={{ color: (row.stock as number) <= 3 ? "var(--a-accent)" : "inherit", fontWeight: (row.stock as number) <= 3 ? 700 : 400 }}>
          {row.stock as number}
        </span>
      ),
    },
    {
      key: "active",
      label: "Status",
      width: "80px",
      render: (row) => (
        <label className="a-toggle-switch">
          <input
            type="checkbox"
            checked={row.active as boolean}
            onChange={() => toggleActive(row.id as string)}
          />
          <span className="a-toggle-switch-track" />
        </label>
      ),
    },
  ];

  return (
    <>
      <div className="a-page-header">
        <h1 className="a-page-title">Produtos</h1>
        <Link href="/admin/products/new" className="a-btn a-btn-primary">
          + Novo Produto
        </Link>
      </div>

      <div className="a-card">
        {/* Filters */}
        <div className="a-filter-bar">
          <div className="a-search-wrap">
            <span className="a-search-icon">🔍</span>
            <input
              className="a-input"
              placeholder="Buscar por nome ou SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="a-select a-select-filter"
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select
            className="a-select a-select-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Todos</option>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>

        <DataTable<Product>
          columns={columns}
          data={filtered}
          onEdit={() => {}}
          onDelete={(row) => handleDelete(row)}
        />
      </div>
    </>
  );
}
