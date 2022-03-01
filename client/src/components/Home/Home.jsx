import Jumbotron from '../Jumbotron/Jumbotron';
import News from '../News/News';
import Projects from '../projects/Projects';
import Volunteer from '../Volunteers/Volunteer';
import Greeting from './Greeting/Greeting';

function Home() {

    return (
        <div>
            <Jumbotron />
            <Greeting />
            <Projects />
            <Volunteer />
            <News />
        </div>
    );
}

export default Home;
