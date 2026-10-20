/**
 * Dados institucionais da Sinum.
 *
 * Ficam num arquivo so porque aparecem em muitos lugares: cabecalho,
 * rodape, JSON-LD do Google, link do WhatsApp, e-mail de contato. Mudar
 * o telefone aqui muda em todo o site.
 *
 * ATENCAO ANTES DE ENTREGAR AO CLIENTE: confira telefone, CRECI e
 * endereco. O CRECI e obrigatorio por lei em anuncio imobiliario
 * (Lei 6.530/78) e a ausencia dele pode gerar autuacao.
 */

export const SITE = {
  nome: 'Sinum Empreendimentos Imobiliários',
  nomeCurto: 'Sinum',
  descricao:
    'Casas, lotes, áreas rurais e oportunidades de investimento em Patrocínio e região. ' +
    'Soluções imobiliárias com inteligência, ética e sofisticação.',
  tagline: 'O sonho do seu imóvel agora é real.',

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://imobiliariasinum.com.br',
  urlApp: process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.imobiliariasinum.com.br',

  // O site atual da Sinum não publica o CRECI. Conferir com a Sinum
  // antes de ir ao ar: a lei exige o número em todo anúncio.
  creci: process.env.NEXT_PUBLIC_CRECI ?? '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5534997321863',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'contato@sinumempreendimento.com.br',

  endereco: {
    logradouro: 'Rua Salitre, 855',
    complemento: 'Recepção do coworking',
    bairro: 'Centro',
    cidade: 'Patrocínio',
    uf: 'MG',
    cep: '',
  },

  redes: {
    instagram: 'https://www.instagram.com/sinumempreendimentos/',
    facebook: '',
    linkedin: '',
  },

  horario: 'Presencial de segunda a sexta, 8h às 18h. WhatsApp a qualquer hora.',

  /** Foto de abertura da home. Ver o comentário em lib/hero.ts. */
  heroImagem: process.env.NEXT_PUBLIC_HERO_IMAGEM ?? null,
} as const;

/** "(34) 99999-0000" a partir do numero cru do WhatsApp. */
export function telefoneVisivel(): string {
  const d = SITE.whatsapp.replace(/^55/, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return SITE.whatsapp;
}

/** Link do WhatsApp com a mensagem ja escrita. */
export function linkWhatsApp(mensagem?: string): string {
  const texto = encodeURIComponent(
    mensagem ?? `Olá! Vim pelo site da ${SITE.nomeCurto} e gostaria de mais informações.`,
  );
  return `https://wa.me/${SITE.whatsapp}?text=${texto}`;
}

export const NAVEGACAO = [
  { rotulo: 'Imóveis', href: '/imoveis' },
  { rotulo: 'Anuncie seu imóvel', href: '/anuncie' },
  { rotulo: 'Sobre a Sinum', href: '/sobre' },
  { rotulo: 'Contato', href: '/contato' },
] as const;

/**
 * Atalhos do painel de menu: buscas prontas, no recorte que a Sinum
 * trabalha (os mesmos destaques do Instagram dela).
 */
export const ATALHOS_MENU = [
  { rotulo: 'Casas à venda', apoio: 'Patrocínio', href: '/imoveis?tipo=Casa' },
  { rotulo: 'Cidade Jardim', apoio: 'Bairro', href: '/imoveis?bairro=Cidade+Jardim' },
  { rotulo: 'Centro', apoio: 'Bairro', href: '/imoveis?bairro=Centro' },
  { rotulo: 'Chácara Flora', apoio: 'Ouro Preto', href: '/imoveis?bairro=Ouro+Preto+%28Ch%C3%A1cara+Flora%29' },
  { rotulo: 'Lotes e terrenos', apoio: 'Investimento', href: '/imoveis?tipo=Terreno' },
  { rotulo: 'Fazendas', apoio: 'Rural', href: '/imoveis?tipo=Fazenda' },
  { rotulo: 'Imóveis para alugar', apoio: 'Locação', href: '/imoveis?finalidade=locacao' },
  { rotulo: 'Destaques', apoio: 'Seleção Sinum', href: '/imoveis?destaque=1' },
] as const;

/** Atalhos embaixo da busca do hero. */
export const ATALHOS_HERO = [
  { rotulo: 'Casas', href: '/imoveis?tipo=Casa' },
  { rotulo: 'Cidade Jardim', href: '/imoveis?bairro=Cidade+Jardim' },
  { rotulo: 'Centro', href: '/imoveis?bairro=Centro' },
  { rotulo: 'Belvedere', href: '/imoveis?bairro=Belvedere' },
  { rotulo: 'Destaques', href: '/imoveis?destaque=1' },
] as const;

/** Links institucionais do rodapé, agrupados por coluna. */
export const RODAPE_COLUNAS = [
  {
    titulo: 'Imóveis',
    itens: [
      { rotulo: 'Todos os imóveis', href: '/imoveis' },
      { rotulo: 'Imóveis salvos', href: '/favoritos' },
      { rotulo: 'Anuncie seu imóvel', href: '/anuncie' },
    ],
  },
  {
    titulo: 'Serviços',
    itens: [
      { rotulo: 'Avaliação de imóvel', href: '/anuncie' },
      { rotulo: 'Financiamento', href: '/contato' },
      { rotulo: 'Investimento e áreas rurais', href: '/contato' },
    ],
  },
  {
    titulo: 'Institucional',
    itens: [
      { rotulo: 'Sobre a Sinum', href: '/sobre' },
      { rotulo: 'Fale conosco', href: '/contato' },
      { rotulo: 'Política de privacidade', href: '/politica-de-privacidade' },
    ],
  },
] as const;

/** O endereço de produção. Só ele entra em buscador. */
export const DOMINIO_OFICIAL = 'imobiliariasinum.com.br';

/**
 * O site está rodando no endereço definitivo?
 *
 * Decide se o robô pode indexar e se o `<meta robots>` sai como
 * `noindex`. A conta é feita sobre NEXT_PUBLIC_SITE_URL, que é a
 * mesma variável usada para montar as URLs canônicas — assim não há
 * um segundo interruptor que alguém possa esquecer de virar no dia da
 * publicação.
 */
export function ehDominioOficial(): boolean {
  try {
    const { hostname } = new URL(SITE.url);
    return hostname === DOMINIO_OFICIAL || hostname === `www.${DOMINIO_OFICIAL}`;
  } catch {
    return false;
  }
}
