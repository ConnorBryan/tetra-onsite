import React from 'react';
import ButtonFab from 'src/components/ButtonFab';
import './styles.scss';

type BannerProps = {
  title: string,
  body: string,
  canClose: boolean,
  isClosed: boolean,
  close: () => void,
  tetraTheme: any,
};

export default function Banner(
  {
    title,
    body = '',
    canClose = true,
    isClosed,
    close,
    tetraTheme,
  }: BannerProps = {}
) {
  return (
    <div className={'banner ' + tetraTheme.name} display-if={!isClosed}>
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <div className="message">
            {title != null
              ? <b>
                  {title.trim()} -{' '}
                </b>
              : null}
            <span>
              {body.trim()}
            </span>
          </div>
        </div>
        <div>
          <ButtonFab
            icon="close"
            color="opaque"
            onClick={() => close()}
            display-if={canClose}
          />
        </div>
      </div>
    </div>
  );
}
