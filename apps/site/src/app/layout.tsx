import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { BarraProgresso } from '@/componentes/BarraProgresso';
import { Cabecalho } from '@/componentes/Cabecalho';
import { Rodape } from '@/componentes/Rodape';
import { BotaoWhatsApp } from '@/componentes/BotaoWhatsApp';
import { AvisoCookies } from '@/componentes/AvisoCookies';
import { ehDominioOficial, SITE } from '@/lib/site';
import { jsonLdImobiliaria } from '@/lib/seo';
import { personalizacao } from '@/lib/personalizacao';
import { ProvedorMarca } from '@/componentes/MarcaDemo';

import './globals.css';

/**
 * Montserrat, a mesma família geométrica do logotipo da Sinum. O
 * contraste da página vem de peso e entreletra: título leve e grande,
 * rótulo pequeno e espaçado, e a marca em caixa alta bem aberta.
 */
const fonte = localFont({
  // Arquivo variável no repositório (licença OFL, em src/fontes): o
  // build não depende de alcançar o Google Fonts.
  // O recorte "latin" já cobre todos os acentos do português.
  src: '../fontes/montserrat-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--f-marca',
  display: 'swap',
});

/**
 * metadataBase e o que faz as imagens de compartilhamento (Open Graph)
 * virarem URL absoluta. Sem ela, o WhatsApp e o Instagram nao conseguem
 * montar a previa do link do imovel.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nome} | Imóveis em Patrocínio e região`,
    template: `%s | ${SITE.nomeCurto}`,
  },
  description: SITE.descricao,
  keywords: [
    'imóveis Patrocínio MG',
    'casas à venda Patrocínio',
    'imobiliária Patrocínio',
    'lotes Patrocínio',
    'fazendas Alto Paranaíba',
    'Sinum Empreendimentos',
  ],
  authors: [{ name: SITE.nome }],
  creator: SITE.nome,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE.url,
    siteName: SITE.nome,
    title: `${SITE.nome} | Imóveis em Patrocínio e região`,
    description: SITE.descricao,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.nome,
    description: SITE.descricao,
  },
  // Fora do domínio oficial o site inteiro sai como noindex. Ver o
  // comentário em robots.ts: staging indexado vira concorrente do
  // site real pelos mesmos termos.
  robots: ehDominioOficial()
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
      }
    : { index: false, follow: false, nocache: true },
  icons: { icon: '/assets/marca/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#060c17',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { css, ...marca } = await personalizacao();

  return (
    <html lang="pt-BR" className={fonte.variable}>
      <body data-demo={marca.demo || undefined}>
        {css &&<style dangerouslySetInnerHTML={{ __html: css }} />}
        <ProvedorMarca valor={marca}>
        {/* Identifica a imobiliaria para o Google. E o que habilita o
            painel de negocio local na busca e no Maps. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdImobiliaria()) }}
        />

        {/* Fica antes de tudo no DOM mas cobre tudo pelo z-index, e
            nao intercepta toque. Ver .grao no globals.css. */}
        <div className="grao" aria-hidden="true" />

        <BarraProgresso />
        <Cabecalho />
        <main>{children}</main>
        <Rodape />
        <BotaoWhatsApp />

        {/* Selo da marca no canto oposto ao WhatsApp. Leva ao topo, que
            e o gesto que a pessoa procura depois de rolar uma listagem
            longa, e mantem a assinatura presente sem ocupar conteudo. */}
        <a className="selo-flutuante" href="#" aria-label="Voltar ao topo">
          <i aria-hidden="true" />
        </a>

        <AvisoCookies />
        </ProvedorMarca>
      </body>
    </html>
  );
}
