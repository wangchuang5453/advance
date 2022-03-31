const report = () => {
  //
}

const _send = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.send = function () {
  const _stateChange = this['onreadystatechange'];
  this.['onreadystatechange'] = function(event) {
    if (this.readyState === 4) {
      const xhr = event.target;
      if (xhr.status.toString()[0] !== '2') {
        report(event.target);
      }
    }
    return _stateChange && _stateChange.apply(this, arguments);
  }
  return _send.apply(this, arguments);
}

const _fetch = window.fetch;
const _newFetch = function () {
  return _fetch.apply(this, arguments).then((res) => {
    if (!res.ok) {
      report(res);
    }
    return res;
  }).catch((err) => {
    report(err);
    return Promise.reject(err);
  });
}

