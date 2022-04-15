import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  width: 300px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

const Button = styled(motion.button)`
  width: 100px;
  height: 50px;
  margin: 10px;
  position: absolute;
  top: 700px;
  outline: none;
  background-color: whitesmoke;
  border-radius: 10px;
  border: none;
  color: orange;
  font-weight: 500;
  font-size: 25px;
`;

const orgins = [
  { ind: "1", value: { originX: 1, originY: 1 } },
  { ind: "2", value: { originX: 0, originY: 1 } },
  { ind: "3", value: { originX: 1, originY: 0 } },
  { ind: "4", value: { originX: 0, originY: 0 } },
];
const circle = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);

  return (
    <Container>
      <Wrapper>
        <AnimatePresence>
          <Grid>
            {orgins.map((i) => {
              return (
                <Box
                  onClick={() => setId(i.ind)}
                  key={i.ind}
                  layoutId={i.ind}
                  whileHover={{ scale: 1.2 }}
                  style={i.value}
                >
                  {i.ind === "2" ? (
                    <Circle variants={circle} layoutId="here" />
                  ) : null}
                  {clicked && i.ind === "3" ? <Circle layoutId="here" /> : null}
                </Box>
              );
            })}
          </Grid>
          {id ? (
            <Overlay
              onClick={() => setId(null)}
              initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
              animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Box layoutId={id} style={{ backgroundColor: "white" }} />
            </Overlay>
          ) : null}
          <Button
            onClick={() => setClicked(!clicked)}
            whileTap={{ scale: 1.2, color: "blue" }}
          >
            Switch
          </Button>
        </AnimatePresence>
      </Wrapper>
    </Container>
  );
}

export default App;
