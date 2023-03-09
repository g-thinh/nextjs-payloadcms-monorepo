import { Article, Aside, Banner, Content, Main, Section } from '@/components/Layout';

export default function BlogPage() {
  return (
    <>
      <Banner>
        <Section css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>My Blog Post Title</h2>
        </Section>
      </Banner>
      <Main>
        <Aside>
          <h3>Table of Contents</h3>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Cras euismod odio enim</li>
          </ul>
        </Aside>
        <Content>
          <Article>
            <Section>
              <h3>Lorem Ipsum</h3>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium nibh quam, nec pellentesque est
                tincidunt malesuada. Proin sed nibh id lacus elementum laoreet. Donec elementum nulla lobortis enim
                egestas porta. Sed interdum mi id tellus congue porttitor. Duis vel porta mauris. Nunc id auctor leo.
                Nulla bibendum neque a dui sollicitudin, nec volutpat ipsum tincidunt. Vestibulum maximus metus a justo
                lacinia, vel volutpat massa mollis. Nam pharetra leo diam, quis pulvinar orci accumsan eget. Aliquam
                lacinia leo sed velit auctor, vel dignissim arcu blandit. Curabitur sapien enim, tristique ac hendrerit
                vitae, ultricies et urna.
              </p>
            </Section>
          </Article>
          <Article>
            <Section>
              <h3>Cras euismod odio enim</h3>
              <br />
              <p>
                Vestibulum sed feugiat justo. Nullam mollis efficitur nulla, quis fermentum eros consequat at. Duis eget
                dictum nisi. In at massa eu mi commodo ullamcorper at a felis. Proin elementum pretium libero, vitae
                volutpat diam euismod eget. Pellentesque eleifend sapien vitae dapibus posuere. Quisque nisl lectus,
                aliquet nec sapien vel, consectetur imperdiet odio. Donec ac massa justo. Fusce efficitur vehicula est
                sed commodo. Curabitur ante ipsum, rutrum quis rutrum eget, venenatis id risus. Donec risus erat,
                feugiat sit amet ante ac, cursus mattis eros. Integer posuere lacus a auctor ultrices. Pellentesque id
                lacus feugiat arcu tincidunt consectetur.
              </p>
              <br />
              <p>
                Nullam ultricies consectetur tortor, ut rutrum dolor pulvinar eget. Duis ullamcorper condimentum orci
                non laoreet. Donec laoreet porttitor nisi a maximus. Sed et enim dui. Morbi nec vulputate massa, non
                consectetur ipsum. Donec tristique in est vitae sagittis. Mauris nec justo velit. Nunc porta dui vel
                semper tincidunt. Sed vitae dui rhoncus, condimentum lacus sed, molestie urna. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi eget tortor euismod, volutpat
                tortor nec, accumsan metus. Donec ac luctus diam. Donec venenatis, nulla at scelerisque facilisis, orci
                arcu commodo ex, ut gravida mauris nisi sodales metus. Aliquam at aliquet quam.
              </p>
            </Section>
          </Article>
        </Content>
      </Main>
    </>
  );
}
