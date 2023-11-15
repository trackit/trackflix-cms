import React, { FC } from "react";
import {
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavSections
} from "@strapi/design-system";
import LeftMenuItem from "../LeftMenuItem";

interface Model {
  index: string;
  enabled: boolean;
}

interface LeftMenuProps {
  models: any[];
  activeModel: any;
  setActiveModel: (model: Model) => void;
}

const LeftMenu: FC<LeftMenuProps> = ({ models, activeModel, setActiveModel }) => {
  return (
    <SubNav>
      <SubNavHeader label="OpenSearch Search" />
      <SubNavSections>
        <SubNavSection label="Models">
          {models && models.length
            ? models.map((model) => (
                <LeftMenuItem
                  label={model.index}
                  onClick={() => setActiveModel(model)}
                  active={model.index === activeModel?.index}
                  enable={model.enabled}
                />
              ))
            : null}
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};

export default LeftMenu;
