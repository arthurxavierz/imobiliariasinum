import { linkWhatsApp } from './site';

/**
 * As frentes de negócio da Sinum, na home.
 *
 * São as mesmas que ela já organiza nos destaques do Instagram: casas,
 * lotes, fazendas e aluguel, mais a captação. Quando a frente tem
 * imóvel publicado na vitrine, o cartão leva à busca; quando ainda não
 * tem (lotes, fazendas e aluguel hoje vivem só no Instagram), leva
 * direto a uma conversa no WhatsApp com a mensagem pronta. Assim nenhum
 * clique termina numa busca vazia.
 *
 * As artes saem do acervo em assets/fotos. Para trocar por foto própria
 * da Sinum, solte o arquivo lá e aponte o campo `arquivo`.
 */
export interface Empreendimento {
  nome: string;
  apoio: string;
  /** Nome do arquivo em assets/fotos, sem a extensão. */
  arquivo: string;
  href: string;
  externo?: boolean;
}

export const EMPREENDIMENTOS: Empreendimento[] = [
  { nome: 'Casas', apoio: 'Nos bairros mais procurados', arquivo: 'casa-05', href: '/imoveis?tipo=Casa' },
  {
    nome: 'Lotes',
    apoio: 'Para construir ou investir',
    arquivo: 'terreno-02',
    href: linkWhatsApp('Olá, Sinum! Quero conhecer os lotes disponíveis.'),
    externo: true,
  },
  {
    nome: 'Fazendas',
    apoio: 'Campo, água e produção',
    arquivo: 'campo-02',
    href: linkWhatsApp('Olá, Sinum! Tenho interesse em fazendas e áreas rurais.'),
    externo: true,
  },
  {
    nome: 'Aluguel',
    apoio: 'Casas para alugar',
    arquivo: 'sala-04',
    href: linkWhatsApp('Olá, Sinum! Procuro um imóvel para alugar.'),
    externo: true,
  },
  { nome: 'Anuncie com a Sinum', apoio: 'Avaliação do seu imóvel', arquivo: 'casa-08', href: '/anuncie' },
];

/** Caminho público da arte: o acervo de fotos, sincronizado para o public/ pelo npm run assets. */
export function arteDoEmpreendimento(arquivo: string): string {
  return `/assets/fotos/${arquivo}.jpg`;
}
