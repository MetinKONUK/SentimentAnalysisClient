/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions,
} from '@mui/material';
import Axios from 'axios';
import AnimalHealth50 from './images/animal-health-50-ml.jpg';
import AnimalHealth200 from './images/animal-health-200-ml.jpg';
import AnimalHealth1000 from './images/animal-health-1000-ml.jpg';
import AntisepticSanitizer100 from './images/antiseptic-sanitizer-100-ml.jpg';
import AntisepticSanitizer200 from './images/antiseptic-sanitizer-200-ml.jpg';
import AntisepticSanitizer1000 from './images/antiseptic-sanitizer-1000-ml.jpg';

function Data() {
  const [scrapedData, setScrapedData] = useState(null);
  useEffect(() => {
    (async () => {
      await Axios.get('http://localhost:3001/read-scraped-data').then(async (response) => {
        setScrapedData(await response.data);
      });
    })();
  }, []);
  const displayProducts = () => scrapedData.map((product) => {
    const { productName } = product;
    let image = null;
    if (productName === 'animal-health-50-ml') {
      image = AnimalHealth50;
    } else if (productName === 'animal-health-200-ml') {
      image = AnimalHealth200;
    } else if (productName === 'animal-health-1000-ml') {
      image = AnimalHealth1000;
    } else if (productName === 'antiseptic-sanitizer-100-ml') {
      image = AntisepticSanitizer100;
    } else if (productName === 'antiseptic-sanitizer-200-ml') {
      image = AntisepticSanitizer200;
    } else {
      image = AntisepticSanitizer1000;
    }
    return (
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345, ml: 3, mb: 3 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                { productName }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });
  return (
    <Grid
      container
      sx={{
        mt: 2,
        mb: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      { scrapedData && displayProducts() }
    </Grid>

  );
}

export default Data;
