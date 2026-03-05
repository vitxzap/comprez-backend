import { MimetypeGuard, RequestMimetype } from "./mimetype.guard"
import { Test, TestingModule } from "@nestjs/testing"
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FeatureFlagService } from "../modules/featureFlag/feature-flag.service";

describe("Mimetype Guard validation", () => {
    let mimetypeGuard: MimetypeGuard;

    const mockReflector = {
        get: jest.fn().mockReturnValue("compressor_allowed_file_types")
    }
    const mockService = {
        getCachedFlagValues: jest.fn().mockResolvedValue('{\n' +
            '"allowed": ["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/x-msvideo"]\n' +
            '}'),
        getCachedFlags: jest.fn().mockResolvedValue({
            flags: {
                compressor_allowed_file_types: {
                    enabled: true,
                    value: '{\n' +
                        '"allowed": ["video/mp4", "video/mpeg", "video/ogg", "video/webm", "video/x-msvideo"]\n' +
                        '}',
                    isDefault: false,
                    featureId: 189598,
                    featureName: 'compressor_allowed_file_types',
                    reason: undefined
                }
            }
        })
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MimetypeGuard,
                {
                    provide: FeatureFlagService,
                    useValue: mockService
                },
                {
                    provide: Reflector,
                    useValue: mockReflector
                }
            ]
        }).compile()
        mimetypeGuard = module.get<MimetypeGuard>(MimetypeGuard);
    })

    it("Should have been instantiated", async () => {
        expect(mimetypeGuard).toBeDefined()
    })

    it("Should pass the mimetype validation", async () => {
        const req = {
            switchToHttp: () => ({
                getRequest: (): RequestMimetype => ({
                    body: {
                        mimetype: "video/mp4"
                    }
                })
            }),
            getHandler: () => ({}),
        } as ExecutionContext;
        const result = await mimetypeGuard.canActivate(req)
        expect(result).toBe(true)
    })

    it("Should refuse the mimetype validation", async () => {
        const req = {
            switchToHttp: () => ({
                getRequest: (): RequestMimetype => ({
                    body: {
                        mimetype: "image/png"
                    }
                })
            }),
            getHandler: () => ({}),
        } as ExecutionContext;
        const result = await mimetypeGuard.canActivate(req)
        expect(result).toBe(false)
    })
})