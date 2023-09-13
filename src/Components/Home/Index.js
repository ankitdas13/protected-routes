import Container from "@mui/material/Container/Container";
import { Grid, Typography } from "@mui/material";
import {useAuth} from "../../Context/Auth"


export default function Home(props) {
  
   const [auth,]  = useAuth()

    return (
        <Container style={{ marginTop: '100px' }}>
            <Grid flex justifyContent={"center"} container spacing={2}>
                <Typography variant="h3" component="h3" sx={{ mb: 5 }} >
                    Home Page
                </Typography>
            </Grid>
        </Container>
    )
}