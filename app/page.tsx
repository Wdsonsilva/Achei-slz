"use client";
import { useEffect, useState } from "react";

const categorias = [
  { nome: "Peças para motos", emoji: "🏍️" },
  { nome: "Peças para carros", emoji: "🚗" },
  { nome: "Roupas e acessórios", emoji: "👕" },
  { nome: "Eletrônicos", emoji: "📱" },
  { nome: "Casa e decoração", emoji: "🏠" },
  { nome: "Ferramentas", emoji: "🔧" },
];

const lojas = [{ nome: "Moto Peças SLZ", tipo: "Peças para motos", emoji: "🏍️" },
  { nome: "Auto Peças Maranhão", tipo: "Peças para carros", emoji: "🚗" },
  { nome: "Moda SLZ", tipo: "Roupas e acessórios", emoji: "👕" },];


const produtos = [
  {
    id: 1,
    nome: "Disco de Freio para Moto",
    categoria: "Peças para motos",
    loja: "Moto Peças SLZ",
    preco: 89.90,
    emoji: "🏍️",
    imagem: "/produtos/freio.jpg",
  },
  {
    id: 2,
    nome: "Farol Automotivo",
    categoria: "Peças para carros",
    loja: "Auto Peças Maranhão",
    preco: 189.90,
    emoji: "🚗",
    imagem: "/produtos/farol.jpg",
  },
  {
    id: 3,
    nome: "Camisa Polo Masculina",
    categoria: "Roupas e acessórios",
    loja: "Moda SLZ",
    preco: 69.90,
    emoji: "👕",
    imagem: "/produtos/camisa.webp",
  },
];


export default function Home() { 
  
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<(typeof produtos)[number] | null>(null);

  // Fecha o dialog com Esc e trava a rolagem da página enquanto ele está aberto
  useEffect(() => {
    if (!produtoSelecionado) return;
    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProdutoSelecionado(null);
    };
    document.addEventListener("keydown", fecharComEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fecharComEsc);
      document.body.style.overflow = "";
    };
  }, [produtoSelecionado]);

  // Ignora maiúsculas e acentos na busca ("camisa" encontra "Camisa", "eletronico" encontra "Eletrônicos")
  const normalizar = (texto: string) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const termoBusca = normalizar(busca);

  const produtosFiltrados = produtos.filter((produto) => {
    const daCategoria =
      categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;
    const casaBusca =
      termoBusca === "" ||
      [produto.nome, produto.categoria, produto.loja].some((campo) =>
        normalizar(campo).includes(termoBusca)
      );
    return daCategoria && casaBusca;
  });

  const temFiltroAtivo = categoriaSelecionada !== "Todas" || termoBusca !== "";

  const limparFiltros = () => {
    setCategoriaSelecionada("Todas");
    setBusca("");
  };

  const irParaProdutos = () => {
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main className="min-h-screen bg-[#F8F6F0] text-[#172B4D]">

      {/* CABEÇALHO */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="text-2xl font-extrabold text-[#EA6A35]">
            Achei SLZ
          </a>

          <nav className="hidden gap-6 md:flex">
            <a href="#categorias">Categorias</a>
            <a href="#lojas">Lojas</a>
            <a href="#entregas">Entregas</a>
          </nav>

          <a
            href="#lojas"
            className="rounded-xl bg-[#EA6A35] px-5 py-3 font-semibold text-white"
          >
            Entrar
          </a>
        </div>
      </header>

      {/* DESTAQUE PRINCIPAL */}
      <section className="bg-[#172B4D] px-6 py-20 text-center text-white">
        <p className="mb-4 font-semibold text-orange-300">
          O marketplace da nossa cidade
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold md:text-6xl">
          Tudo o que você procura,
          <span className="block text-orange-400">
            você acha aqui!
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-gray-200">
          Descubra lojas, produtos e serviços de São Luís
          em um só lugar.
        </p>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            irParaProdutos();
          }}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="O que você está procurando?"
            aria-label="Buscar produtos"
            className="min-w-0 flex-1 rounded-xl bg-white px-5 py-4 text-gray-800 outline-none"
          />

          <button
            type="submit"
            className="rounded-xl bg-[#EA6A35] px-8 py-4 font-bold text-white"
          >
            Buscar
          </button>
        </form>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold">
          Explore por categorias
        </h2>

        <p className="mt-2 text-gray-600">
          Encontre o que precisa perto de você.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7">
          {[{ nome: "Todas", emoji: "🛍️" }, ...categorias].map((categoria) => (
            <button
              type="button"
              onClick={() => {
                setCategoriaSelecionada(categoria.nome);
                irParaProdutos();
              }}
              key={categoria.nome}
              aria-pressed={categoriaSelecionada === categoria.nome}
              className={`rounded-2xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                categoriaSelecionada === categoria.nome ? "ring-2 ring-[#EA6A35]" : ""
              }`}
            >
              <span className="text-4xl">
                {categoria.emoji}
              </span>

              <p className="mt-3 font-semibold">
                {categoria.nome}
              </p>
            </button>
          ))}
        </div>
      </section>

      
{/* PRODUTOS EM DESTAQUE */}
<section id="produtos" className="mx-auto max-w-6xl px-6 py-16">

  <h2 className="text-3xl font-bold text-[#172B4D]">
    Produtos em destaque
  </h2>

  <div className="mt-2 flex flex-wrap items-center gap-3 text-gray-600">
    <p>
      {temFiltroAtivo
        ? `${produtosFiltrados.length} produto(s) encontrado(s)`
        : "Confira produtos das lojas de São Luís."}
    </p>

    {temFiltroAtivo && (
      <button
        type="button"
        onClick={limparFiltros}
        className="rounded-lg bg-gray-200 px-3 py-1 text-sm text-gray-800"
      >
        Limpar filtros
      </button>
    )}
  </div>

  {produtosFiltrados.length === 0 && (
    <p className="mt-8 rounded-2xl bg-white p-6 text-center text-gray-600 shadow-sm">
      Nenhum produto encontrado. Tente outro termo ou categoria.
    </p>
  )}

  <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

    {produtosFiltrados.map((produto) => (
      <article
        key={produto.id}
        className="rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="flex h-40 items-center justify-center rounded-xl bg-[#F8F6F0]">
          
<img
  src={produto.imagem}
  alt={produto.nome}
  className="h-full w-full object-contain p-4"
/>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          {produto.categoria}
        </p>

        <h3 className="mt-2 text-lg font-bold">
          {produto.nome}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Loja: {produto.loja}
        </p>

        <p className="mt-4 text-2xl font-bold text-[#27856B]">
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>

        <button
          type="button"
          onClick={() => setProdutoSelecionado(produto)}
          className="mt-4 w-full rounded-xl bg-[#EA6A35] px-4 py-3 font-semibold text-white"
        >
          Ver produto
        </button>
      </article>
    ))}

  </div>
</section>

      {/* LOJAS EM DESTAQUE */}
      <section id="lojas" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">
            Lojas em destaque
          </h2>

          <p className="mt-2 text-gray-600">
            Conheça alguns estabelecimentos.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {lojas.map((loja) => (
              <article
                key={loja.nome}
                className="rounded-2xl border border-gray-100 bg-[#F8F6F0] p-7"
              >
                <div className="text-5xl">{loja.emoji}</div>

                <h3 className="mt-5 text-xl font-bold">
                  {loja.nome}
                </h3>

                <p className="mt-2 text-gray-600">
                  {loja.tipo}
                </p>

                <p className="mt-4 font-semibold text-[#EA6A35]">
                  Em breve no Achei SLZ
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENTREGAS */}
      <section id="entregas" className="px-6 py-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#27856B] px-8 py-12 text-center text-white">
          <div className="text-5xl">🛵</div>

          <h2 className="mt-5 text-3xl font-bold">
            Sua compra até você!
          </h2>

          <p className="mx-auto mt-4 max-w-xl">
            Com o Achei SLZ, você poderá acompanhar
            suas entregas e receber seus pedidos.
          </p>
        </div>
      </section>

      
      {/* RODAPÉ */}
      <footer className="bg-[#172B4D] px-6 py-8 text-center text-white">
        <h2 className="text-xl font-bold text-orange-400">
          Achei SLZ
        </h2>

        <p className="mt-2 text-sm text-gray-300">
          Valorizando o comércio de São Luís, Maranhão.
        </p>

        <p className="mt-5 text-xs text-gray-400">
          © 2026 Achei SLZ. Todos os direitos reservados.
        </p>
      </footer>

      {/* DETALHES DO PRODUTO (DIALOG) */}
      {produtoSelecionado && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-produto"
          onClick={() => setProdutoSelecionado(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-lg"
          >
            <button
              type="button"
              onClick={() => setProdutoSelecionado(null)}
              className="mb-6 rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
            >
              ← Voltar aos produtos
            </button>

            <div className="grid gap-8 md:grid-cols-2">
              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="h-72 w-full rounded-xl object-contain"
              />

              <div>
                <p className="text-sm text-gray-500">
                  {produtoSelecionado.categoria}
                </p>

                <h2 id="titulo-produto" className="mt-2 text-3xl font-bold">
                  {produtoSelecionado.nome}
                </h2>

                <p className="mt-4 text-gray-600">
                  Loja: {produtoSelecionado.loja}
                </p>

                <p className="mt-6 text-3xl font-bold text-[#27856B]">
                  {produtoSelecionado.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <p className="mt-4 text-gray-600">
                  Consulte a loja para obter mais informações sobre este produto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
