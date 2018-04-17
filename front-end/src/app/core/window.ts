export class WINDOW extends Window {}

export const windowFactory = () => {
  // const originalAlert = window.alert;
  // window.alert = (p: any) => {
  //   originalAlert(p);
  // };

  return window;
};
