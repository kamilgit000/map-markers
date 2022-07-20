import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DialogContent {
  title: string;
  description?: string;
  primaryText: string;
  onPrimary?: () => void;
  secondaryText?: string;
  onSecondary?: () => void;
}

interface DialongState {
  show: (dialogContent: DialogContent) => void;
  hide: () => void;
}
const DialogContext = createContext<DialongState | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export default function DialogProvider({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogContent, setDialogContent] = useState<
    DialogContent | undefined
  >();

  const show = useCallback((dialogContent: DialogContent) => {
    setDialogContent(dialogContent);
    setIsVisible(true);
  }, []);
  const hide = useCallback(() => setIsVisible(false), []);

  const onPrimaryPress = useCallback(() => {
    dialogContent?.onPrimary?.();
    hide();
  }, [hide, dialogContent]);

  const onSecondaryPress = useCallback(() => {
    dialogContent?.onSecondary?.();
    hide();
  }, [hide, dialogContent]);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Modal
        open={isVisible}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {!!dialogContent && (
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {dialogContent.title}
              </Typography>
              {!!dialogContent.description && (
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {dialogContent.description}
                </Typography>
              )}
              <Grid
                container
                alignContent={"center"}
                justifyContent="space-around"
                marginTop={3}
              >
                {dialogContent.secondaryText && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onSecondaryPress}
                  >
                    {dialogContent.secondaryText}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={onPrimaryPress}
                >
                  {dialogContent.primaryText}
                </Button>
              </Grid>
            </Box>
          )}
        </>
      </Modal>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const dialogContext = useContext(DialogContext);
  if (!dialogContext) {
    throw new Error(
      "Dialog context can be used only inside DialogContext.Provider"
    );
  }

  return dialogContext;
}
