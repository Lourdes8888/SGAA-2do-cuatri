import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function FAQ() {
  const id = React.useId();
  return (
    <section className="student-section">
      <h1>Ayuda</h1>
      <div className="faq-list">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
        >
          <Typography component="span">¿Qué es el SGA?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            El Sistema de Gestión Académica permite consultar y administrar la información de alumnos y docentes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography component="span">¿Cómo administro alumnos?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Desde la sección Alumnos podés registrar, editar y eliminar alumnos.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel3-content`}
          id={`${id}-panel3-header`}
        >
          <Typography component="span">¿Cómo administro docentes?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Desde la sección Docentes podés registrar, editar y eliminar docentes.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    </section>
  );
}