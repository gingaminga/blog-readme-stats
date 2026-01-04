/**
 * @description Dependency Injection Container
 *
 * 역할:
 * - 서비스 바인딩 및 인스턴스 제공
 * - Singleton 패턴으로 서비스 관리
 *
 * 사용법:
 * 1. 서비스에 @injectable() 데코레이터 추가
 * 2. 이 파일에서 bind() 후 get()으로 인스턴스 생성
 * 3. export하여 컨트롤러에서 사용
 *
 * 서비스 추가 시:
 * 1. container.bind<ServiceClass>(ServiceClass).toSelf().inSingletonScope();
 * 2. export const serviceName = container.get<ServiceClass>(ServiceClass);
 */
import { InfoService } from "@services/info.service";
import { Container } from "inversify";

const container = new Container();

container.bind<InfoService>(InfoService).toSelf().inSingletonScope();
export const infoService = container.get<InfoService>(InfoService);

export default container;
