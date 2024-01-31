import { Button, Transition, rem, useMantineTheme, Affix } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import { animateScroll } from "react-scroll";

export default function Affixbottom() {
  const [scroll] = useWindowScroll();
  const theme = useMantineTheme();
  return (
    <>
      <Affix>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftSection={
                <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => animateScroll.scrollTo(0)}
              m={10}
              color={theme.colors.green[9]}
            >
              Kembali ke atas
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
