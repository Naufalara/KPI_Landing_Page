import attributes from "./attributes.json";
import { StoryWrapper } from "../../component/StoryWrapper/StoryWrapper";
import { NotFoundImage } from "./NotFoundImage";

export default { title: "NotFoundImage" };

export function Usage() {
  return <StoryWrapper attributes={attributes} component={NotFoundImage} />;
}
