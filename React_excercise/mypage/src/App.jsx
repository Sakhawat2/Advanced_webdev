import Header from './Header';
import Section from './Section';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Section id="home" title="Welcome to My Website">
        <p>We are dedicated to bringing you the best service and solutions.</p>
        <p><strong>Our mission:</strong> To provide quality content and services that exceed expectations.</p>
      </Section>
      <Section id="about" title="About Us">
        <p>Founded in 2025, our company has grown from a small startup to a leading provider of tech solutions.</p>
        <p>We believe in innovation, dedication, and putting our customers first.</p>
      </Section>
      <Section id="services" title="Our Services">
        <ul>
          <li><strong>Web Development:</strong> Creating stunning, responsive websites.</li>
          <li><strong>Mobile Apps:</strong> Developing user-friendly mobile applications.</li>
          <li><strong>SEO Optimization:</strong> Helping your website rank higher in search results.</li>
        </ul>
      </Section>
      <Section id="contact" title="Contact Us">
        <p>Have questions or need assistance? Reach out to us!</p>
        <p>Email: md.hossain2@centria.fi</p>
        <p>Phone: +358417295788</p>
      </Section>
    </div>
  );
}

export default App;
