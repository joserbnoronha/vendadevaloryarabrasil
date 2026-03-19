import { APP_NAME, APP_SUBTITLE } from '../data/knowledgeBase';

export const Header = () => {
  return (
    <header className="hero">
      <div className="hero__topline">
        <span className="hero__badge">Planejador de Reuniões de Alta Performance</span>
        <span className="hero__tag">Yara Brasil</span>
      </div>
      <h1>{APP_NAME}</h1>
      <p className="hero__subtitle">{APP_SUBTITLE}</p>
      <p className="hero__description">
        Prepare reuniões com foco em produtividade, rentabilidade, margem por hectare e redução de risco, conduzindo a conversa para valor, ciência agronômica e retorno sobre investimento, nunca para guerra de preço.
      </p>
      <div className="hero__highlights">
        <span>OPC | Direção estratégica</span>
        <span>SPIN | Diagnóstico consultivo</span>
        <span>EPA | Provocação de valor</span>
        <span>Senoide | Narrativa de decisão</span>
      </div>
    </header>
  );
};
