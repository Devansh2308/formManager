import { useFormBuilder } from "../FormBuilderProviders";
import { TStateItem } from "../types";
import ElementWrapper from "../formBuilder/preview/FormItemWrapper";

export const useRender = () => {
  const { formElementsMap } = useFormBuilder();

  const render = (item: TStateItem, onItemClick: () => void) => {
    const formItem = formElementsMap?.find(
      (el) => el.type === item.element
    );
    console.log("item", item)
    const C = formItem?.component(item?.settings!);
    return (<>
      <ElementWrapper onItemClick={onItemClick} id={item.id}>
        {C}
      </ElementWrapper>
    </>);
  };

  return render;
};
