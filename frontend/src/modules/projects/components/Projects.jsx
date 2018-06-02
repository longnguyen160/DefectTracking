import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageCustomStyled, ElementStyled, TitleElementStyled, DescriptionElementStyled } from '../../../stylesheets/GeneralStyled';
import { openModal } from '../../layout/actions/layout';
import { MODAL_TYPE } from '../../../utils/enums';

class Projects extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProject: '',
      priority: ''
    };
  }

  render() {
    const { openModal } = this.props;

    return (
      <PageCustomStyled>
        <ElementStyled>
          <TitleElementStyled>
            Capstone
          </TitleElementStyled>
          <DescriptionElementStyled>
            <LinesEllipsis
              text='abd iijs opsa ospa ocmpda iasjdoa sjasdi asoidsd hfiosd fhisodhf isodfweiw epxic ddic dksnckfiweoweei jijf iowej fiowe'
              maxLine='2'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Tgame
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Cube
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Cloakify
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Hr-Forte
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Capstone
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Tgame
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Cube
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Cloakify
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled>
          <TitleElementStyled>
            Hr-Forte
          </TitleElementStyled>
          <DescriptionElementStyled>
            abd iijs opsa ospa ocmpd
          </DescriptionElementStyled>
        </ElementStyled>
        <ElementStyled created onClick={() => openModal(MODAL_TYPE.CREATING_PROJECT)}>
          <TitleElementStyled>
            Create new project...
          </TitleElementStyled>
        </ElementStyled>
      </PageCustomStyled>
    );
  }
}

Projects.propTypes = {
  openModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal
}, dispatch);

export default connect(null, mapDispatchToProps)(Projects);
