import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Container, Row, Col, Navbar, Nav, Button, Card, Form, Carousel, Modal } from 'react-bootstrap';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Zap, Factory, Building2, Wrench, Sun, Headphones, Menu, X, ChevronRight, FileText } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './updates.css';

const adminMail = 'admin@urbinstal.pt';
const comercialMail = 'comercial@urbinstal.pt';
const tecnicoMail = 'tecnico@urbinstal.pt';
const telUrl = 'tel:+351918834769';
const whatsappUrl = 'https://wa.me/351918834769?text=Ol%C3%A1%20Urbinstal%2C%20gostaria%20de%20obter%20mais%20informa%C3%A7%C3%B5es.';
const gmailCompose = (to, subject, body = '') =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const quoteMail = gmailCompose(comercialMail, 'Pedido de Orçamento - Urbinstal', 'Olá Urbinstal,\n\nGostaria de pedir um orçamento.\n\nObrigado.');
const supportMail = gmailCompose(tecnicoMail, 'Pedido de Suporte Técnico - Urbinstal', 'Olá Urbinstal,\n\nPreciso de suporte técnico.\n\nObrigado.');
const adminMailUrl = gmailCompose(adminMail, 'Contacto Website - Urbinstal', 'Olá Urbinstal,\n\nGostaria de obter mais informações.\n\nObrigado.');


function WhatsAppBrandIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.04 3C9.47 3 4.13 8.34 4.13 14.91c0 2.1.55 4.15 1.6 5.96L4 29l8.34-1.68a11.86 11.86 0 0 0 5.7 1.45h.01c6.57 0 11.91-5.34 11.91-11.91C29.96 8.34 24.62 3 16.04 3Zm0 23.77h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-4.95 1 1.02-4.82-.24-.39a9.89 9.89 0 0 1-1.51-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.91 7.02c0 5.47-4.45 9.92-9.91 9.92Zm5.44-7.43c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

function PhoneSolidIcon({ size = 23 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.2 2.47.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2Z" />
    </svg>
  );
}

const services = [
  { icon: Building2, title: 'Infraestruturas em Urbanizações', text: 'Redes de média e baixa tensão, postos de transformação, iluminação pública e infraestruturas telefónicas ITUR.' },
  { icon: Factory, title: 'Instalações Industriais', text: 'Soluções elétricas para edifícios industriais, armazéns, fábricas e espaços empresariais de elevada exigência.' },
  { icon: Wrench, title: 'Manutenção Técnica', text: 'Serviços preventivos e corretivos para assegurar continuidade operacional, segurança e desempenho.' },
  { icon: Zap, title: 'Instalações Elétricas de Utilização', text: 'Montagem, renovação e acompanhamento técnico em edifícios, comércio, escritórios e habitação.' },
  { icon: ShieldCheck, title: 'Redes Elétricas e Iluminação Pública', text: 'Execução de redes de distribuição, iluminação urbana, decorativa e soluções exteriores fiáveis.' },
  { icon: Sun, title: 'Energias Renováveis', text: 'Sistemas energéticos sustentáveis orientados para eficiência, autoconsumo e redução de custos.' },
  { icon: Headphones, title: 'Instalações Técnicas Especiais', text: 'Integração técnica para projetos exigentes, com planeamento, execução e suporte especializado.' }
];

const works = [
  { img: '/assets/casas.png', title: 'Infraestruturas em Urbanizações', text: 'Redes elétricas, ITUR, postos de transformação e iluminação pública.' },
  { img: '/assets/armazem.png', title: 'Instalações Industriais', text: 'Execução técnica para armazéns, indústria e espaços empresariais.' },
  { img: '/assets/manutencao.png', title: 'Manutenção Técnica', text: 'Continuidade, segurança e resposta operacional em instalações.' },
  { img: '/assets/instalacao.png', title: 'Instalações Elétricas de Utilização', text: 'Soluções para edifícios, comércio, serviços e habitação.' },
  { img: '/assets/publica.png', title: 'Redes e Iluminação Pública', text: 'Distribuição elétrica, iluminação pública e redes exteriores.' },
  { img: '/assets/tur.png', title: 'ITUR / Telecomunicações', text: 'Infraestruturas telefónicas em urbanizações e redes técnicas.' }
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [expanded, setExpanded] = useState(false);
  const links = ['empresa', 'servicos', 'obras', 'recrutamento', 'contactos'];
  return (
    <Navbar expand="lg" expanded={expanded} className="site-nav" fixed="top">
      <Container>
        <Navbar.Brand href="#home" className="brand"><img src="/assets/logo.png" alt="Urbinstal" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" onClick={() => setExpanded(!expanded)}>{expanded ? <X/> : <Menu/>}</Navbar.Toggle>
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link href="#home" onClick={() => setExpanded(false)}>Home</Nav.Link>
            {links.map(link => <Nav.Link key={link} href={`#${link}`} onClick={() => setExpanded(false)}>{link.charAt(0).toUpperCase() + link.slice(1)}</Nav.Link>)}
            <Button as="a" className="nav-cta" href={quoteMail} target="_blank" rel="noreferrer">Pedir orçamento</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Hero() {
  return <section id="home" className="hero-section"><Container><Row className="align-items-center g-5"><Col lg={6} className="reveal hero-copy"><h1>Engenharia elétrica para projetos que exigem confiança.</h1><p>Infraestruturas elétricas, urbanizações, instalações industriais, iluminação pública, energias renováveis e manutenção com rigor técnico, segurança e compromisso.</p></Col><Col lg={6} className="reveal"><div className="hero-photo"><img src="/assets/homepage.png" alt="Infraestruturas elétricas Urbinstal" loading="lazy" /></div></Col></Row></Container></section>;
}

function Counters() {
  const items = [{n:'20+',label:'anos de experiência técnica'}, {n:'7',label:'áreas de serviço especializadas'}, {n:'3',label:'linhas telefónicas de apoio'}, {n:'ISO 9001',label:'compromisso com qualidade'}];
  return <section className="stats-band reveal"><Container><Row className="g-3">{items.map((it,i)=><Col md={3} sm={6} key={i}><div className="stat"><strong>{it.n}</strong><span>{it.label}</span></div></Col>)}</Row></Container></section>;
}

function Empresa() {
  return <section id="empresa" className="section"><Container><Row className="g-5 align-items-center"><Col lg={5} className="reveal"><div className="section-kicker">Empresa</div><h2>Uma estrutura técnica orientada para qualidade, segurança e melhoria contínua.</h2><p>A Urbinstal atua com uma política de qualidade focada na satisfação de clientes, colaboradores, fornecedores e parceiros, mantendo uma atitude responsável perante a segurança, o ambiente e a sociedade.</p><Button as="a" href={quoteMail} target="_blank" rel="noreferrer" className="btn-red">Falar com comercial</Button></Col><Col lg={7}><Row className="g-3">{['Missão','Visão','Política','Valores'].map((t,i)=><Col md={6} key={t} className="reveal"><Card className="info-card h-100"><Card.Body><span className="card-index">0{i+1}</span><Card.Title>{t}</Card.Title><Card.Text>{['Contribuir para soluções de elevado valor e qualidade, evoluindo com sustentabilidade e formação contínua.','Ser referência no setor, entregando soluções de confiança que reforçam produtividade e rentabilidade.','Promover melhoria contínua, cumprimento legal, segurança, ambiente e excelência operacional.','Verdade, responsabilidade, confiança, apoio, entusiasmo e espírito de equipa em cada projeto.'][i]}</Card.Text></Card.Body></Card></Col>)}</Row></Col></Row></Container></section>;
}

function Servicos() {
  return <section id="servicos" className="section section-light"><Container><div className="title reveal"><div className="section-kicker">Serviços</div><h2>Soluções completas para infraestruturas e instalações técnicas.</h2><p>Preparado para municípios, promotores, indústria e clientes empresariais.</p></div><Row className="g-4">{services.map(({icon:Icon,title,text})=><Col lg={4} md={6} key={title} className="reveal"><Card className="service-card h-100"><Card.Body><div className="service-icon"><Icon size={26}/></div><Card.Title>{title}</Card.Title><Card.Text>{text}</Card.Text><a href={quoteMail} target="_blank" rel="noreferrer">Solicitar orçamento <ChevronRight size={16}/></a></Card.Body></Card></Col>)}</Row></Container></section>;
}

function Obras() {
  const [show, setShow] = useState(false); const [current, setCurrent] = useState(works[0]);
  return <section id="obras" className="section dark-section"><Container><div className="title reveal"><div className="section-kicker">Obras</div><h2>Portfólio técnico por área de intervenção.</h2><p>Projetos em urbanizações, redes exteriores, indústria, instalações elétricas, manutenção e energias renováveis.</p></div><Carousel className="works-slider reveal" indicators>{works.map(w=><Carousel.Item key={w.title}><Row className="align-items-center g-4"><Col lg={7}><button className="work-image" onClick={()=>{setCurrent(w);setShow(true)}}><img src={w.img} alt={w.title} loading="lazy" /></button></Col><Col lg={5}><h3>{w.title}</h3><p>{w.text}</p><Button as="a" href={quoteMail} target="_blank" rel="noreferrer" className="btn-red">Pedir orçamento</Button></Col></Row></Carousel.Item>)}</Carousel><Row className="g-3 mt-4">{works.map(w=><Col md={4} sm={6} key={w.title} className="reveal"><button className="work-thumb" onClick={()=>{setCurrent(w);setShow(true)}}><img src={w.img} alt={w.title} loading="lazy"/><span>{w.title}</span></button></Col>)}</Row></Container><Modal show={show} onHide={()=>setShow(false)} centered size="xl"><Modal.Body className="p-0 lightbox"><button className="lightbox-close" onClick={()=>setShow(false)}>×</button><img src={current.img} alt={current.title}/><div><h3>{current.title}</h3><p>{current.text}</p></div></Modal.Body></Modal></section>;
}

function Recrutamento() {
  return <section id="recrutamento" className="section"><Container><Row className="g-5 align-items-center"><Col lg={6} className="reveal"><div className="section-kicker">Recrutamento</div><h2>Junte-se a uma equipa técnica em crescimento.</h2><p>Recebemos candidaturas espontâneas para áreas técnicas, operacionais, engenharia e apoio administrativo.</p><Button as="a" href={gmailCompose(adminMail, 'Candidatura Espontânea - Urbinstal', 'Olá Urbinstal,\n\nGostaria de enviar a minha candidatura espontânea.\n\nObrigado.')} target="_blank" rel="noreferrer" className="btn-red">Enviar candidatura</Button></Col><Col lg={6} className="reveal"><div className="image-panel"><img src="/assets/11.png" alt="Equipa técnica Urbinstal" loading="lazy" /></div></Col></Row></Container></section>;
}

function Contactos() {
  const [form, setForm] = useState({nome:'', email:'', telefone:'', assunto:'Pedido de informação', mensagem:''});
  const mailHref = useMemo(() => gmailCompose(
    adminMail,
    `${form.assunto} - Contacto Website`,
    `Nome: ${form.nome}\nEmail: ${form.email}\nTelefone: ${form.telefone}\n\nMensagem:\n${form.mensagem}`
  ), [form]);

  return <section id="contactos" className="section section-light contact-section"><Container><div className="title reveal"><div className="section-kicker">Contactos</div><h2>Fale connosco sobre o seu próximo projeto.</h2><p>Pedidos de orçamento, apoio técnico, informação comercial e candidaturas.</p></div><Row className="g-4"><Col lg={5} className="reveal"><div className="contact-card"><p><MapPin/> Rua da Platina Lt.83<br/>Parque Industrial Vale do Alecrim<br/>2950-007 Palmela</p><p><Phone/> +351 212 382 930<br/>+351 212 382 931<br/>+351 212 382 932</p><p><Clock/> Segunda a sexta-feira<br/>09:00 - 18:00</p><p><Mail/> admin@urbinstal.pt<br/>comercial@urbinstal.pt<br/>tecnico@urbinstal.pt</p></div></Col><Col lg={7} className="reveal"><Form className="contact-form"><Row className="g-3"><Col md={6}><Form.Control placeholder="Nome" value={form.nome} onChange={e=>setForm({...form,nome:e.target.value})}/></Col><Col md={6}><Form.Control type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></Col><Col md={6}><Form.Control placeholder="Telefone" value={form.telefone} onChange={e=>setForm({...form,telefone:e.target.value})}/></Col><Col md={6}><Form.Select value={form.assunto} onChange={e=>setForm({...form,assunto:e.target.value})}><option>Pedido de informação</option><option>Pedido de orçamento</option><option>Suporte técnico</option><option>Recrutamento</option></Form.Select></Col><Col xs={12}><Form.Control as="textarea" rows={6} placeholder="Mensagem" value={form.mensagem} onChange={e=>setForm({...form,mensagem:e.target.value})}/></Col><Col xs={12}><Button as="a" href={mailHref} target="_blank" rel="noreferrer" className="btn-red w-100">Enviar mensagem por email</Button></Col><Col xs={12}><a className="privacy-inline" href="/politica-privacidade.html" target="_blank" rel="noreferrer"><FileText size={16}/> Política de Privacidade e RGPD</a></Col></Row></Form><div className="map-wrap mt-4"><iframe title="Mapa Urbinstal" src="https://www.google.com/maps?q=Urbinstal,+S.A.,+Rua+da+Platina+Lote+83,+Parque+Industrial+Vale+do+Alecrim,+2950-007+Palmela&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></Col></Row></Container><MobileContactBar /></section>;
}

function MobileContactBar() {
  return <div className="mobile-contact-bar" aria-label="Contactos rápidos"><a href={telUrl} className="mobile-call" aria-label="Ligar agora"><PhoneSolidIcon /></a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="mobile-whatsapp" aria-label="Abrir WhatsApp"><WhatsAppBrandIcon /></a></div>;
}

function Footer(){return <footer><Container><Row className="g-3 align-items-center"><Col md={7}><strong>Urbinstal</strong><p>Energia, infraestruturas, manutenção e soluções técnicas.</p></Col><Col md={5} className="text-md-end"><a href={quoteMail} target="_blank" rel="noreferrer">Orçamentos</a><a href={supportMail} target="_blank" rel="noreferrer">Suporte</a><a href="#contactos">Contactos</a><a href="/politica-privacidade.html" target="_blank" rel="noreferrer">Privacidade</a></Col></Row></Container></footer>}

function App(){useReveal(); return <><Header/><Hero/><Counters/><Empresa/><Servicos/><Obras/><Recrutamento/><Contactos/><Footer/></>}

createRoot(document.getElementById('root')).render(<App/>);
