import type { Metadata } from 'next';

import { FormularioInteresse } from '@/componentes/FormularioInteresse';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Anuncie seu imóvel',
  description:
    'Avaliação sem compromisso, apresentação que valoriza o imóvel e divulgação no site e no Instagram da Sinum. Anuncie seu imóvel em Patrocínio.',
  alternates: { canonical: '/anuncie' },
};

const ETAPAS = [
  {
    numero: '01',
    titulo: 'Avaliação gratuita',
    texto:
      'Visitamos o imóvel e comparamos com o que está sendo negociado em Patrocínio. Você recebe uma faixa de valor com justificativa, não um chute.',
  },
  {
    numero: '02',
    titulo: 'Preparação do anúncio',
    texto:
      'Fotos, vídeo e descrição escrita para vender. Um imóvel bem apresentado recebe muito mais contatos que o mesmo imóvel mal fotografado.',
  },
  {
    numero: '03',
    titulo: 'Exposição qualificada',
    texto:
      'Seu imóvel entra no site e no Instagram da Sinum, e é apresentado direto aos clientes que já procuram esse perfil.',
  },
  {
    numero: '04',
    titulo: 'Acompanhamento',
    texto:
      'Você sabe quantas pessoas viram o anúncio, quem visitou e o que disseram. Sem retorno, o proprietário fica no escuro. Aqui não fica.',
  },
];

export default function PaginaAnuncie() {
  return (
    <div className="container pagina">
      <span className="rotulo">Para proprietários</span>
      <h1 className="titulo-2">
        Seu imóvel merece <em>a vitrine certa</em>.
      </h1>
      <p className="texto-apoio">
        Na Sinum, cada imóvel recebe atenção de verdade, do campo à cidade, e não vira mais um
        anúncio perdido numa lista de mil.
      </p>

      <div className="duas-colunas" style={{ marginTop: 64 }}>
        <div>
          {ETAPAS.map((e) => (
            <section key={e.numero} style={{ marginBottom: 44 }}>
              <span className="rotulo">{e.numero}</span>
              <h2
                style={{
                  fontFamily: 'var(--fonte-titulo)',
                  fontSize: 26,
                  fontWeight: 400,
                  marginTop: 12,
                }}
              >
                {e.titulo}
              </h2>
              <p style={{ color: 'var(--texto-apoio)', marginTop: 12, lineHeight: 1.75, maxWidth: '58ch' }}>
                {e.texto}
              </p>
            </section>
          ))}
        </div>

        <div className="painel-contato" style={{ position: 'sticky', top: 100 }}>
          <span className="rotulo">Avaliação sem compromisso</span>
          <p style={{ color: 'var(--texto-apoio)', fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>
            Conte onde fica o imóvel e o que você espera dele. Um consultor da {SITE.nomeCurto}{' '}
            retorna com a análise de valor.
          </p>
          <FormularioInteresse />
        </div>
      </div>
    </div>
  );
}
