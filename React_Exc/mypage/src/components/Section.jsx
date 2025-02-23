import React from 'react';

function Section({ id, title, children }) {
  return (
    <section id={id}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export default Section;
