declare module "pigeon-maps" {
  type marker = [number, number];
  declare const Map = (props: {
    onBoundsChanged?: (args: { center: marker; zoom: number }) => void;
    zoom?: number;
    center?: marker;
    defaultCenter?: marker;
    defaultZoom?: number;
    children?: React.ReactNode;
  }) => JSX.Element;
  declare const Marker = (props: {
    width: number;
    anchor: marker;
    color: string;
    children?: React.ReactNode;
  }) => JSX.Element;
}
