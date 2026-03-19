interface StatusBannerProps {
  tone: 'error' | 'loading' | 'empty' | 'success';
  title: string;
  message: string;
}

export const StatusBanner = ({ tone, title, message }: StatusBannerProps) => {
  if (tone === 'loading') {
    return (
      <section className="status status--loading" aria-live="polite">
        <div className="status__spinner" aria-hidden="true" />
        <div>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`status status--${tone}`} aria-live="polite">
      <div>
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </section>
  );
};
