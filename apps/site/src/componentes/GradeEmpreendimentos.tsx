import Image from 'next/image';
import Link from 'next/link';

import { EMPREENDIMENTOS, arteDoEmpreendimento } from '@/lib/empreendimentos';

import { IconeSeta } from './Icones';

/**
 * Grade das frentes de negócio (ver lib/empreendimentos.ts).
 *
 * Sem componente de cliente e sem JavaScript: a entrada escalonada é
 * animação de CSS com atraso por índice, e o realce no hover é seletor
 * puro.
 */
export function GradeEmpreendimentos() {
  if (EMPREENDIMENTOS.length === 0) return null;

  return (
    <div className="grade-empreendimentos">
      {EMPREENDIMENTOS.map((item, i) => {
        const conteudo = (
          <>
            <Image
              src={arteDoEmpreendimento(item.arquivo)}
              alt=""
              fill
              sizes="(max-width: 700px) 50vw, 20vw"
              style={{ objectFit: 'cover' }}
            />
            <span className="empreendimento-veu" aria-hidden="true" />
            <span className="empreendimento-nome">
              <span>
                {item.nome}
                <small>{item.apoio}</small>
              </span>
              <IconeSeta />
            </span>
          </>
        );
        const estilo = { '--ordem': i } as React.CSSProperties;

        return item.externo ? (
          <a key={item.nome} className="empreendimento" href={item.href} target="_blank" rel="noopener noreferrer" style={estilo}>
            {conteudo}
          </a>
        ) : (
          <Link key={item.nome} className="empreendimento" href={item.href} style={estilo}>
            {conteudo}
          </Link>
        );
      })}
    </div>
  );
}
