import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE, linkWhatsApp } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sobre a Sinum',
  description: `${SITE.nome}: soluções imobiliárias com ética, segurança e visão de futuro em Patrocínio e região.`,
  alternates: { canonical: '/sobre' },
};

export default function PaginaSobre() {
  return (
    <div className="container pagina">
      <span className="rotulo">Quem somos</span>
      <h1 className="titulo-2">
        Sonhe e <em>realize</em>.
      </h1>

      <div className="prosa" style={{ marginTop: 48 }}>
        <p>
          A {SITE.nome} nasceu da parceria entre famílias empreendedoras de Patrocínio que
          dividem o mesmo propósito: construir legados com ética, segurança e visão de futuro.
        </p>

        <h2>Mais do que uma imobiliária</h2>
        <p>
          Nosso trabalho não termina na venda. Acompanhamos cada cliente na conquista da casa
          própria, num investimento feito com segurança ou num passo de crescimento patrimonial,
          do primeiro contato até a chave na mão.
        </p>

        <h2>O que a marca representa</h2>
        <p>
          O símbolo da Sinum fala de fundação e solidez, da ligação entre o campo e a cidade e dos
          novos caminhos que se abrem para quem busca um imóvel, um lar ou um investimento. É por
          isso que a nossa carteira vai das casas nos bairros mais procurados da cidade aos lotes
          e às áreas rurais da região.
        </p>

        <h2>Como trabalhamos</h2>
        <p>
          Transparência, confiança e cuidado em cada detalhe. Cada imóvel é apresentado com fotos
          reais e ficha completa, e cada cliente tem atendimento direto pelo WhatsApp, a qualquer
          hora.
        </p>

        {SITE.creci && (
          <>
            <h3>Registro profissional</h3>
            <p>{SITE.creci}</p>
          </>
        )}
      </div>

      <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link className="btn btn-ouro" href="/imoveis">
          Conhecer os imóveis
        </Link>
        <a className="btn btn-contorno" href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
          Falar com a Sinum
        </a>
      </div>
    </div>
  );
}
