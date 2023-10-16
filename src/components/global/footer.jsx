// Filename - components/Footer.js
import { Box, FooterContainer, FooterLink, Row, Column, Heading } from "./footerStyle";

export const Footer = () => {
	return (
		<Box>
			<FooterContainer>
				<Row>
					<Column>
						<Heading>About Us</Heading>
						<FooterLink href="/">
							FindingPets
						</FooterLink>
						<FooterLink href="https://petgarden-f030018191f7.herokuapp.com/Swagger/index.html" target="_blank">
							APIs
						</FooterLink>
						<FooterLink href="https://github.com/Khoa190516" target="_blank">
							KhoaHT
						</FooterLink>
					</Column>
					<Column>
						<Heading>Services</Heading>
						<FooterLink href="#">
							Design Database
						</FooterLink>
						<FooterLink href="#">
							Website
						</FooterLink>
						<FooterLink href="#">
							Coding
						</FooterLink>
						<FooterLink href="#">
							Testing
						</FooterLink>
					</Column>
					<Column>
						<Heading>Contact Us</Heading>
						<FooterLink href="https://github.com/Khoa190516" target="_blank">
							KhoaHT
						</FooterLink>
					</Column>
					<Column>
						<Heading>Social Media</Heading>
						<FooterLink href="https://www.facebook.com/P.Koha" target="_blank">
							<i className="fab fa-facebook-f">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									Facebook
								</span>
							</i>
						</FooterLink>
						<FooterLink href="https://github.com/Khoa190516" target="_blank">
							<i className="fab fa-github">
								<span
									style={{
										marginLeft: "10px",
									}}
								>
									GitHub
								</span>
							</i>
						</FooterLink>
					</Column>
				</Row>
			</FooterContainer>
		</Box>
	);
};
