import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './style.css'

import VmStatusText from './VmStatusText'
import VmActions from '../VmActions'
import { VmIcon, VmStatusIcon } from 'ovirt-ui-components'
import { closeAllConfirmationComponents } from '../Confirmation'

import { selectVmDetail } from '../../actions/index'

/**
 * Single icon-card in the list
 */
const Vm = ({ vm, icons, onSelectVm, visibility }) => {
  const state = vm.get('status')

  const iconId = vm.getIn(['icons', 'large', 'id'])
  const icon = icons.get(iconId)
  const isSelected = vm.get('id') === visibility.get('selectedVmDetail')

  const onCardClick = () => {
    closeAllConfirmationComponents()
    onSelectVm()
  }

  // TODO: improve the card flip:
  // TODO: https://davidwalsh.name/css-flip
  // TODO: http://tympanus.net/codrops/2013/12/18/perspective-page-view-navigation/
  // TODO: https://desandro.github.io/3dtransforms/docs/card-flip.html
  return (
    <div className={`col-xs-12 col-sm-6 col-md-4 col-lg-3 ${isSelected ? style['selectedVm'] : ''}`}>
      <div className='card-pf card-pf-view card-pf-view-select card-pf-view-single-select'>
        <div className='card-pf-body'>
          <div className='card-pf-top-element' onClick={onCardClick}>
            <VmIcon icon={icon} className={style['card-pf-icon']}
              missingIconClassName='fa fa-birthday-cake card-pf-icon-circle' />
          </div>
          <h2 className='card-pf-title text-center' onClick={onCardClick}>
            <p className={[style['vm-name'], style['crop']].join(' ')} title={vm.get('name')} data-toggle='tooltip'>
              <VmStatusIcon state={state} />&nbsp;{vm.get('name')}
            </p>
          </h2>

          <VmActions vm={vm} isOnCard />
          <VmStatusText vm={vm} />

        </div>
      </div>
    </div>
  )
}
Vm.propTypes = {
  vm: PropTypes.object.isRequired,
  icons: PropTypes.object.isRequired,
  onSelectVm: PropTypes.func.isRequired,
  visibility: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    icons: state.icons,
    visibility: state.visibility,
  }),
  (dispatch, { vm }) => ({
    onSelectVm: () => dispatch(selectVmDetail({ vmId: vm.get('id') })),
  })
)(Vm)
