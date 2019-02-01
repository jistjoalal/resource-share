import React from 'react';
import { withRouter } from 'react-router-dom';

const CMDS = {
  home: 'Go to homepage',
  help: 'Show this message',
  clear: 'Clear the output',
  '/[page]': 'Go to page',
  '/cc/[std]': 'Go to Common Core Standard',
  'http://[url]': 'Go to url',
}

const USER_CMDS = {
  favs: 'Your favorites page',
  subs: 'Your submissions page',
}

class CmdBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cmd: 'Home',
      output: [
        "Whoops, couldn't find that page.",
        "Where to next?",
      ],
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDown);
  }
  runCmd = () => {
    const { output } = this.state;
    const cmd = this.state.cmd.toLowerCase();
    const newOutput = output.slice();
    newOutput.push(cmd);
    if (cmd === 'home') {
      this.props.history.push('/');
    }
    else if (cmd === 'help') {
      Object.entries(CMDS).forEach(c =>
        newOutput.push(`${c[0]}:\t${c[1]}`)
      );
      if (Meteor.userId()) {
        newOutput.push('Users only:')
        Object.entries(USER_CMDS).forEach(c =>
          newOutput.push(`${c[0]}:\t${c[1]}`)
        )
      }
    }
    else if (cmd === 'clear') {
      newOutput.splice(0,newOutput.length);
    }
    else if (Meteor.userId()) {
      if (cmd === 'favs') {
        this.props.history.push(`/favorites/${Meteor.userId()}`)
      }
      else if (cmd === 'subs') {
        this.props.history.push(`/submissions/${Meteor.userId()}`)
      }
    }
    this.setState({ output: newOutput });
  }
  submit = () => {
    const { cmd } = this.state
    const cmdExists = [...Object.keys(CMDS), ...Object.keys(USER_CMDS)]
      .includes(cmd.toLowerCase());

    if (cmdExists) this.runCmd();
    else if (!cmd.includes('http')) this.props.history.push(cmd);
    else window.location = cmd;
    this.setState({ cmd: '' });
  }
  keyDown = e => {
    const { cmd } = this.state;
    if (e.key === 'Backspace') {
      this.setState({ cmd: cmd.slice(0, cmd.length - 1) });
    }
    else if ('0123456789abcdefghijklmnopqrstuvwxyz/:.'
      .includes(e.key.toLowerCase()))
    {
      this.setState({ cmd: cmd + e.key });
    }
    else if (e.key === 'Enter') {
      this.submit();
    }
  }
  render() {
    const href = this.state.cmd.toLowerCase() === 'home' ? '/' : this.state.cmd;
    return (
      <div onKeyDown={this.keyDown}>
        {this.state.output.map(line =>
          <p key={Math.random()} className="text-muted text-monospace">
            > {line}
          </p>
        )}

        <p className="text-monospace notFoundFun">
          >&nbsp;
          <a href={href}>
            <span className="blink" type="text" data-end="█">
              {this.state.cmd}
            </span>
          </a>
        </p>
      </div>
    );
  }
}

export default withRouter(CmdBox);
