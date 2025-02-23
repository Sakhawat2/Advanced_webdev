import React from 'react';

const Section = ({ id, title, children }) => (
  <section id={id}>
    <h1>{title}</h1>
    {children}
  </section>
);

export default Section;
