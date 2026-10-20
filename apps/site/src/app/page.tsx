import Image from 'next/image';
import Link from 'next/link';

import { buscarDestaques, buscarLoteDestaque, buscarRecentes } from '@imob/db';

import { BrilhoPonteiro } from '@/componentes/BrilhoPonteiro';
import { BuscaHero } from '@/componentes/BuscaHero';
import { CartaoCondominio } from '@/componentes/CartaoCondominio';
import { CartaoImovel } from '@/componentes/CartaoImovel';
import { Contador } from '@/componentes/Contador';
import { DestaquesComAbas } from '@/componentes/DestaquesComAbas';
import { Esteira } from '@/componentes/Esteira';
import { GradeEmpreendimentos } from '@/componentes/GradeEmpreendimentos';
import { Newsletter } from '@/componentes/Newsletter';
import { Revelar } from '@/componentes/Revelar';
import { SecaoHero } from '@/componentes/SecaoHero';
import { TituloRevelado } from '@/componentes/TituloRevelado';
import { VitrineDestaque } from '@/componentes/VitrineDestaque';
import { IconeCasa, IconeSeta, IconeWhatsApp } from '@/componentes/Icones';
import { carregarBusca, carregarCondominios, carregarFacetas } from '@/lib/dados';
import { imagemDoHero } from '@/lib/hero';
import {
  destaquesVitrine,
  loteDestaqueVitrine,
  recentesVitrine,
  semBanco,
} from '@/lib/demonstracao';
import { ATALHOS_HERO, SITE, linkWhatsApp } from '@/lib/site';
import { supabase } from '@/lib/supabase';

/**
 * A home e regenerada a cada 5 minutos. O visitante recebe HTML pronto
 * do CDN, o que mantem a pagina rapida e indexavel, e um imovel
 * publicado no sistema de gestao aparece aqui em poucos minutos, sem
 * precisar de novo deploy.
 */
export const revalidate = 300;

export default async function PaginaInicial() {
  const [destaques, recentes, loteDestaque, condominios, facetas, carteira] = await Promise.all([
    carregar(() => buscarDestaques(supabase(), 8), () => destaquesVitrine(8), []),
    carregar(() => buscarRecentes(supabase(), 8), () => recentesVitrine(8), []),
    carregar(() => buscarLoteDestaque(supabase(), 36), () => loteDestaqueVitrine(36), []),
    carregarCondominios({ limite: 10 }),
    carregarFacetas(),
    carregarBusca({ porPagina: 1 }),
  ]);

  const luxo = condominios.filter((c) => c.luxo);
  const vitrineCondominios = luxo.length >= 4 ? luxo : condominios;

  const heroImagem = imagemDoHero();

  return (
    <>
      {/* ---------- ABERTURA ---------- */}
      <SecaoHero>
        <div className="hero-fundo" aria-hidden="true">
          {heroImagem && (
            <Image
              src={heroImagem}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        {!heroImagem && <div className="hero-cidade" aria-hidden="true" />}
        <div className="hero-veu" aria-hidden="true" />

        <div className="container hero-conteudo">
          <span className="rotulo">Patrocínio e região · MG</span>

          <h1 className="titulo-1">
            <span className="linha-mascara">
              <span style={{ '--atraso': '120ms' } as React.CSSProperties}>
                O sonho do seu imóvel
              </span>
            </span>
            <span className="linha-mascara">
              <span style={{ '--atraso': '260ms' } as React.CSSProperties}>
                agora é <em className="destaque-italico">real</em>
              </span>
            </span>
          </h1>

          {/* Dezoito palavras. O texto anterior tinha trinta e ocupava
              cinco linhas no celular, empurrando a busca para fora da
              primeira tela — e a busca e a acao principal desta pagina. */}
          <p className="hero-texto">
            Casas, lotes e áreas rurais em Patrocínio e região, com fotos reais e atendimento
            direto da equipe Sinum.
          </p>

          <BuscaHero
            bairros={facetas.bairros}
            cidades={facetas.cidades}
            condominios={facetas.condominios}
          />

          <div className="atalhos">
            {ATALHOS_HERO.map((a) => (
              <Link key={a.href} className="atalho" href={a.href}>
                {a.rotulo}
                <IconeSeta />
              </Link>
            ))}
          </div>
        </div>

        <span className="rolar" aria-hidden="true">
          <span className="rolar-trilho" />
          Role
        </span>
      </SecaoHero>

      {/* ---------- NUMEROS ---------- */}
      <div className="container">
        <Revelar>
          <div className="faixa-numeros">
            {/* Números tirados da própria carteira, e não de marketing:
                mudam sozinhos quando a Sinum publica um imóvel novo. */}
            <div className="numero-bloco">
              <span className="numero-valor">
                <Contador ate={carteira.total} />
              </span>
              <span className="numero-rotulo">Imóveis à venda</span>
            </div>
            <div className="numero-bloco">
              <span className="numero-valor">
                <Contador ate={facetas.bairros.length} />
              </span>
              <span className="numero-rotulo">Bairros na carteira</span>
            </div>
            <div className="numero-bloco">
              <span className="numero-valor">
                <Contador ate={24} sufixo="h" />
              </span>
              <span className="numero-rotulo">WhatsApp, todos os dias</span>
            </div>
            <div className="numero-bloco">
              <span className="numero-valor">
                <Contador ate={100} sufixo="%" />
              </span>
              <span className="numero-rotulo">Fotos reais dos imóveis</span>
            </div>
          </div>
        </Revelar>
      </div>

      {/* ---------- EMPREENDIMENTOS ---------- */}
      <section className="secao secao-empreendimentos" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Revelar>
            <div className="cabecalho-secao">
              <div>
                <span className="rotulo">Do campo à cidade</span>
                <TituloRevelado texto="Soluções imobiliárias Sinum" grifo="Sinum" />
              </div>
            </div>
          </Revelar>

          <GradeEmpreendimentos />
        </div>
      </section>

      {/* ---------- CONDOMINIOS ---------- */}
      {vitrineCondominios.length > 0 && (
        <section className="secao">
          <div className="container">
            <Revelar>
              <div className="cabecalho-secao">
                <div>
                  <span className="rotulo">Onde a cidade quer morar</span>
                  <TituloRevelado texto="Condomínios de alto padrão" grifo="alto padrão" />
                  <p className="texto-apoio" style={{ marginTop: 18 }}>
                    Conhecemos a planta, a incidência de sol e o histórico de negociação de cada um
                    destes endereços. É o que permite dizer, antes da visita, se o imóvel serve para
                    você.
                  </p>
                </div>
                <Link className="link-seta" href="/condominios">
                  Ver todos os condomínios
                  <IconeSeta />
                </Link>
              </div>
            </Revelar>

            {/* Revelação padrão, e não a máscara: o clip-path da máscara
                sobre um trilho com rolagem horizontal deixava a seção
                inteira preta em parte das máquinas, mesmo sem will-change. */}
            <Revelar>
              <BrilhoPonteiro>
                <Esteira rotulo="Condomínios em destaque">
                  {vitrineCondominios.map((c, i) => (
                    <CartaoCondominio key={c.id} condominio={c} prioridade={i < 3} />
                  ))}
                </Esteira>
              </BrilhoPonteiro>
            </Revelar>
          </div>
        </section>
      )}

      {/* ---------- DESTAQUES ---------- */}
      {destaques.length > 0 && (
        <section className="secao secao-carvao">
          <div className="container">
            <Revelar>
              <BrilhoPonteiro>
                <DestaquesComAbas
                  destaques={destaques}
                  recentes={recentes.length > 0 ? recentes : destaques}
                />
              </BrilhoPonteiro>
            </Revelar>
          </div>
        </section>
      )}

      {/* ---------- IMOVEIS EM DESTAQUE ---------- */}
      {loteDestaque.length > 0 && (
        <section className="secao">
          <div className="container">
            <Revelar>
              <div className="cabecalho-secao">
                <div>
                  <span className="rotulo">Seleção Sinum</span>
                  <TituloRevelado texto="Imóveis em destaque" grifo="destaque" />
                  <p className="texto-apoio" style={{ marginTop: 18 }}>
                      Uma amostra da carteira, sorteada a cada visita. Recarregue a página e a
                    seleção muda.
                  </p>
                </div>
                <Link className="link-seta" href="/imoveis">
                  Ver toda a carteira
                  <IconeSeta />
                </Link>
              </div>
            </Revelar>

            {/* Sem <Revelar> em volta do trilho, de propósito. Envolvido
                pelo efeito de máscara, este bloco ficava invisível em
                parte das máquinas: a máscara esconde por clip-path sobre
                uma camada que o will-change já tinha promovido para a
                GPU, e nessa combinação alguns drivers simplesmente não
                pintam o resultado. Aqui os cartões entram direto. */}
            <BrilhoPonteiro>
              <VitrineDestaque lote={loteDestaque} />
            </BrilhoPonteiro>

            {/* O atalho repete o link do cabeçalho da seção, e a repetição
                é intencional: quem rolou os sete cartões está com a
                intenção quente e a esta altura o link de cima saiu da
                tela. Em ouro cheio porque é a ação principal da página
                depois da busca. */}
            <div className="acao-vitrine">
              <Link className="btn btn-ouro btn-grande" href="/imoveis">
                Ver todos os imóveis
                <IconeSeta />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- COMO TRABALHAMOS ---------- */}
      <section className="secao secao-carvao">
        <div className="container">
          <Revelar>
            <div className="cabecalho-secao">
              <div>
                <span className="rotulo">Sonhe e realize</span>
                <TituloRevelado
                  texto="Mais do que vender imóveis, construir legados"
                  grifo="construir legados"
                />
                <p className="texto-apoio" style={{ marginTop: 20 }}>
                  A Sinum nasceu da parceria entre famílias empreendedoras de Patrocínio. O nosso
                  trabalho acompanha você da primeira conversa até a chave na mão.
                </p>
              </div>
            </div>
          </Revelar>

          <div className="grade">
            {DIFERENCIAIS.map((item, i) => (
              <Revelar key={item.titulo} atraso={i * 110}>
                <article className="etapa">
                  <span className="etapa-numero">{item.numero}</span>
                  <h3>{item.titulo}</h3>
                  <p>{item.texto}</p>
                </article>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROPRIETARIOS ---------- */}
      <section className="secao">
        <div className="container">
          <Revelar efeito="zoom">
            <div className="chamada">
              <span className="rotulo" style={{ justifyContent: 'center' }}>
                Para proprietários
              </span>
              <TituloRevelado
                texto="Seu imóvel merece a vitrine certa"
                italico="a vitrine certa"
                className="titulo-2 titulo-centro"
              />
              <p className="texto-apoio">
                Avaliação com base no mercado de Patrocínio, apresentação com fotos que valorizam o
                imóvel e divulgação no site e no Instagram da Sinum.
              </p>

              <div className="chamada-acoes">
                <Link className="btn btn-ouro" href="/anuncie">
                  <IconeCasa />
                  Quero anunciar meu imóvel
                </Link>
                <a
                  className="btn btn-contorno"
                  href={linkWhatsApp('Olá! Gostaria de uma avaliação do meu imóvel.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconeWhatsApp />
                  Pedir avaliação no WhatsApp
                </a>
              </div>
            </div>
          </Revelar>
        </div>
      </section>

      {/* ---------- NOVIDADES ---------- */}
      <section className="secao" style={{ paddingTop: 0 }}>
        <div className="container">
          <Revelar>
            <Newsletter />
          </Revelar>
        </div>
      </section>
    </>
  );
}

const DIFERENCIAIS = [
  {
    numero: '01',
    titulo: 'Ética e segurança',
    texto:
      'Cada negociação é conduzida com transparência, documentação conferida e informação clara. Confiança é o que sustenta um legado.',
  },
  {
    numero: '02',
    titulo: 'Do campo à cidade',
    texto:
      'Casas nos bairros mais procurados, lotes para construir e fazendas para produzir. Uma só equipe para todas as etapas do seu patrimônio.',
  },
  {
    numero: '03',
    titulo: 'Atendimento de perto',
    texto:
      'Você fala direto com a equipe Sinum pelo WhatsApp, a qualquer hora, e recebe vídeo, fotos e condições sem precisar ir a lugar nenhum.',
  },
];

/**
 * Carrega do banco, ou da demonstracao, ou desiste em silencio.
 *
 * A home nao pode cair porque uma das quatro consultas falhou. Sem o
 * dado, a secao correspondente simplesmente nao aparece e o restante da
 * pagina segue no ar.
 */
async function carregar<T>(
  doBanco: () => Promise<T>,
  daDemonstracao: () => T,
  reserva: T,
): Promise<T> {
  if (semBanco()) return daDemonstracao();

  try {
    return await doBanco();
  } catch (erro) {
    console.error('[home] falha ao carregar:', erro);
    return reserva;
  }
}
