import {
  useLocation,
  useNavigate,
  useParams,
  Location,
} from "react-router-dom";

type RouterProps = {
  location: Location;
  navigate: (to: string) => void;
  params: { [key: string]: string };
};

const convertParamsToString = (params: {
  [key: string]: string | undefined;
}): { [key: string]: string } => {
  const convertedParams: { [key: string]: string } = {};
  Object.keys(params).forEach((key) => {
    convertedParams[key] = params[key] || "";
  });
  return convertedParams;
};

const withRouter = <P extends {}>(
  Component: React.ComponentType<P & { router: RouterProps }>
): React.ComponentType<P> => {
  const ComponentWithRouterProp: React.FC<P> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = convertParamsToString(useParams()) as {
      [key: string]: string;
    };
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

export default withRouter;
