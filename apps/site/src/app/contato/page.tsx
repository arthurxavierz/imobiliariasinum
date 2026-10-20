import type { Metadata } from 'next';

import { FormularioInteresse } from '@/componentes/FormularioInteresse';
import { SITE, linkWhatsApp, telefoneVisivel } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contato',
  description: `Fale com a ${SITE.nome}. Compra, venda e investimento em imóveis em Patrocínio e região.`,
  alternates: { canonical: '/contato' },
};

export default function PaginaContato() {
  return (
    <div className="container pagina">
      <span className="rotulo">Fale com a Sinum</span>
      <h1 className="titulo-2">
        Vamos conversar sobre o <em>seu</em> próximo imóvel.
      </h1>

      <div className="duas-colunas" style={{ marginTop: 56 }}>
        <div className="prosa">
          <h2>Onde estamos</h2>
          <p>
            {SITE.endereco.logradouro}
            <br />
            {SITE.endereco.bairro} · {SITE.endereco.cidade} - {SITE.endereco.uf}
          </p>
          <p>
            Ao chegar, procure a recepção do coworking e peça pela Sinum: a equipe é avisada na
            hora e desce para receber você.
          </p>

          <h3>Atendimento</h3>
          <p>{SITE.horario}</p>

          <h3>Canais diretos</h3>
          <p>
            WhatsApp:{' '}
            <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ouro)' }}>
              {telefoneVisivel()}
            </a>
            <br />
            E-mail:{' '}
            <a href={`mailto:${SITE.email}`} style={{ color: 'var(--ouro)' }}>
              {SITE.email}
            </a>
            <br />
            Instagram:{' '}
            <a href={SITE.redes.instagram} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ouro)' }}>
              @sinumempreendimentos
            </a>
          </p>

          {SITE.creci && (
            <>
              <h3>Registro profissional</h3>
              <p>{SITE.creci}</p>
            </>
          )}
        </div>

        <div className="painel-contato" style={{ position: 'static' }}>
          <span className="rotulo">Envie uma mensagem</span>
          <p style={{ color: 'var(--texto-apoio)', fontSize: 14, marginTop: 12 }}>
            A mensagem chega direto para a equipe Sinum.
          </p>
          <FormularioInteresse />
        </div>
      </div>
    </div>
  );
}
