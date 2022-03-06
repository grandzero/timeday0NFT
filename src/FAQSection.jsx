import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '25px', color:"white" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function FAQSection() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container  direction="row"
      alignItems="center"
        justifyContent="center" 
          style={{width:"100%", textAlign:"left", padding:50, margin:0}}>
      <Accordion style={{backgroundColor:"#0f0f0f", color:"white"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
          <p style={{color:"white"}}>What is TimeNFT</p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            TimeNFT is a collectible on-chain NFT which works like a personal vesting vault. TimeNFT is a revolutionary and fun approach to refundable NFT's and vesting vaults. TimeNFT's rarity depends on the amount paid for minting. And the fund will be vested according to amount to be minted.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor:"#0f0f0f", color:"white"}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary  aria-controls="panel2d-content" id="panel2d-header">
          <p style={{color:"white"}}>What is the mint price?</p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            Name your price ! But be careful, it should be over 1 ONE. If you pay lower then 10x more then min price(1 ONE) your NFT will be common, if greater then 10x and lower then 50x it will be uncommon, if between 50x and 100x it will be rare, if between 100x and 1000x it will be epic, if between 1000x and 10000x it will be legendary, if bigger then 10000x it's rarity will be godlike.
          </p>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{backgroundColor:"#0f0f0f", color:"white"}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary  aria-controls="panel3d-content" id="panel3d-header">
          <p style={{color:"white"}}>How TimeNFT works?</p>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            You can mint with any price above minimum minting price which is 1 ONE. BUT, your NFT will represent your investment amount and vesting time. Once you send your fund to contract, amount of value will decide your NFT's rarity, rank and how long your fund will stake. For every 1 ONE, your fund will be staked for 1 day. Once your stake time completed, you can get your fund back. If you believe in cryptos and ONE ecosystems growth, you can stake your coins and once you withdraw at end of vesting time, you will still have your NFT !
          </p>
        </AccordionDetails>
      </Accordion>
      
      </Grid>
  );
}
